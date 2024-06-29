import User from '../models/user.js'
import Appointment from '../models/appointment.js'
import WastePrice from '../models/waste_price.js'
import { waste_collected } from '../mailer/waste_collected.js'

export const tasks = async (req, res) => {
    try {
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let appointments = await Appointment.find({ disposer: req.user.username, date: today.toISOString().split('T')[0] });
        for (let appointment of appointments) {
            let user = await User.findOne({username: appointment.user}, {name: 1, email: 1, contact: 1, address: 1});
            appointment = {...appointment, name: user.name, email: user.email, contact: user.contact, address: user.address};
        }

        return res.status(200).json(appointments);
        
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}

export const updateStatus = async (req, res) => {
    try {
        
        await Appointment.updateOne({ _id: req.body.appointmentId }, { status: req.body.status });
        let user = await Appointment.findById(req.body.appointmentId, { user: 1 });
        user = await User.findOne({username: user.user}, {email: 1});

        // Send mail to the user
        waste_collected(user.email, req.user);

        return res.status(200).json({ message: 'Status updated successfully' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}

export const history = async (req, res) => {
    try {
        let appointments = await Appointment.find({ disposer: req.user.username, status: { $in: ['completed', 'cancelled']} });
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

// Add new waste
export const addWaste = async (req, res) => {
    try {
        
        await WastePrice.create({
            disposer: req.user.username,
            wasteType: req.body.wasteType,
            price: req.body.price
        });

        return res.status(201).json({ message: 'Waste added successfully!' });
        
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}