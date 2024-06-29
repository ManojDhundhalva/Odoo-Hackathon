import mongoose, { Mongoose } from "mongoose";

const apointmentScehma = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    disposer: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    waste_type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'completed'],
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Appointment = mongoose.model('Appointment', apointmentScehma);

export default Appointment;