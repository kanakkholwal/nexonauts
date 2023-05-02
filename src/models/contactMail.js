import mongoose from "mongoose";


const contactMailSchema = new mongoose.Schema({
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
    category: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
    },
    phoneNumber:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    read:{
        type: Boolean,
        default: false
    }
});


export default mongoose.models.ContactMail || mongoose.model('ContactMail', contactMailSchema)