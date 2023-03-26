import mongoose from "mongoose";


const NotificationSchema = new mongoose.Schema({
    message: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },

});


export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema)