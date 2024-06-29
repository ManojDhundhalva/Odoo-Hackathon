import User from '../models/user.js'
import Appointment from '../models/appointment.js'
import WastePrice from '../models/waste_price.js'
import Disposer from '../models/disposer.js'

export const available_disposers = async (req, res) => {
    try {

        // If the user has not updated the location, return an error
        let location = await User.findById(req.user.id, { location: 1 }).lean();

        if(!location) {
            return res.status(422).json({message: "Location not updated!"});
        }

        // Find the available disposers satisfying the conditions (quantity and waste type)
        let users = await User.find({ role: 'disposers' }, {name: 1, username: 1, location: 1, contact: 1, address: 1}).lean();
        for (const user of users) {
            let quantity = await Disposer.findOne({ username: user.username });
            if (!quantity.quantity || quantity.quantity > req.body.quantity) {
                users = users.filter((u) => u.username !== user.username);
            } else {
                user.processing_methods = quantity.processing_methods;
                user.license_number = quantity.license_number;
            }
            let wasteType = await WastePrice.findOne({ disposer: user.username, wasteType: req.body.waste_type });
            if (!wasteType) {
                users = users.filter((u) => u.username !== user.username);
            } else {
                user.price = wasteType.price;
            }
        }

        let availableDisposers = [];

        // find the nearby disposers
        for (const user of users) {
            const apiKey = process.env.API_KEY;

            const startCoordinates = location;
            const endCoordinates = user.location;
            if (!endCoordinates) {
                continue;
            }
            const traffic = true;

            const tomtomApiEndpoint = 'https://api.tomtom.com/routing/1/calculateRoute/';
            const url = `${tomtomApiEndpoint}${startCoordinates}:${endCoordinates}/json?key=${apiKey}&traffic=${traffic}`;

            const response = await axios.get(url);
            const data = response.data;
            const route = data.routes && data.routes[0];

            if (route) {
                const distance = route.summary.lengthInMeters / 1000; // in km
                const travelTime = route.summary.travelTimeInSeconds / 60; // in mins

                if (distance <= req.body.distance) {
                    user.distance = distance;
                    user.travelTime = travelTime;
                    availableDisposers.push(user);
                }
            } else {
                console.error('No route found.');
            }
        }
    
        return res.status(201).json({ availableDisposers: availableDisposers });

    } catch (error) {
        console.log('Error: ', error.message);
        return res.status(500).json({ error: 'Server Error!' });
    }
}

export const history = async (req, res) => {
    try {
        let appointments = await Appointment.find({ disposer: req.user.username, status: { $in: ['completed', 'cancelled', 'pending']} });
        for (let appointment of appointments) {
            let user = await User.findOne({username: appointment.user}, {name: 1, email: 1, contact: 1, address: 1});
            appointment = {...appointment, name: user.name, email: user.email, contact: user.contact, address: user.address};
            let wastePrice = await WastePrice.findOne({ wasteType: appointment.waste_type, disposer: appointment.disposer }, { price: 1 });
            appointment = {...appointment, price: wastePrice.price};
        }

        return res.status(200).json(appointments);
        
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}