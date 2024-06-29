import User from '../models/user.js'
import Appointment from '../models/appointment.js'
import WastePrice from '../models/waste_price.js'
import Disposer from '../models/disposer.js'
import { book_appointment_disposer } from '../mailer/book_appointment.js'
import { book_appointment_user } from '../mailer/book_appointment.js'
import axios from 'axios'


export const available_disposers = async (req, res) => {
    try {

        // If the user has not updated the location, return an error
        let location = await User.findById(req.user.id, { location: 1 }).lean();
        location = location.location;
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
                user.wasteType = req.body.waste_type
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

// Check if the disposer is available on the given slot
export const check_availability = async (req, res) => {
    try {
        let date = req.body.date;
        let slots = await Appointment.find({ disposer: req.body.username, date: date });
        let available_slots = [1, 2, 3, 4];   // 1: 9-11, 2: 11-1, 3: 2-4, 4: 4-6
        
        for (let slot of slots) {
            available_slots = available_slots.filter((s) => s !== slot.slot);
        }

        return res.status(200).json({ available_slots: available_slots });

    } catch (err) {
        console.log('Error: ', err);
        return res.redirect('back');
    }
}

// Book an appointment
export const book_appointment = async (req, res) => {
    try {
        let appointment = await Appointment.create({
            user: req.user.username,
            disposer: req.body.username,
            date: req.body.date,
            slot: req.body.slot,
            waste_type: req.body.waste_type,
            status: 'pending',
            transaction_id: req.body.transaction_id
        });

        let disposer = await User.findOne({ username: req.body.username });
        let user = await User.findOne({ username: req.user.username });

        // Send mail to the disposer
        book_appointment_user(disposer, req.user.email, user.name, date);
        book_appointment_disposer(user, disposer.email, disposer.name, date);

        return res.status(201).json({ message: 'Appointment booked successfully!' });

    } catch (err) {
        console.log('Error: ', err);
        return res.status(500).json({ error: 'Server Error!' });
    }
}

// Check the past appointments of the user
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