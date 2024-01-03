import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        default:"NORMAL"
    },
    category: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
    },
    website:{
        type: String,
    },
    read:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});


export default mongoose.models.Message || mongoose.model('Message', messageSchema)