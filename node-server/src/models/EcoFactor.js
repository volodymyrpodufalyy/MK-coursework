
import mongoose from 'mongoose';

const EcoFactor = new mongoose.Schema({
    type: { type: String, required: true },
    value: { type: Number, required: true },
})

export default mongoose.model('EcoFactor', EcoFactor)