
import mongoose from 'mongoose';

const EcoFactor = new mongoose.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
})

export default mongoose.model('EcoFactor', EcoFactor)