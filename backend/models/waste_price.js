import mongoose from "mongoose";

const wastePriceScehma = new mongoose.Schema({
    disposer: {
        type: String,
        required: true
    },
    waste_type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const WastePrice = mongoose.model('wastePrice', wastePriceScehma);

export default WastePrice;