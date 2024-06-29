import mongoose from "mongoose";

const disposerScehma = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    processing_methods: String,
    quantity: Number,
    license_number: String
},{
    timestamps: true
});

const Disposer = mongoose.model('Disposer', disposerScehma);

export default Disposer;