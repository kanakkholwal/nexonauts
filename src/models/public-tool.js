import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});


const publicToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    coverImage:{
        type: String,
        required: true,
        default: "https://via.placeholder.com/150"
    },
    description:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    categories: [{
        name:String,
        slug:String
    }],
    link:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ["draft", "published", "archived","deleted","pending","rejected"],
        default: "draft" || "pending"
    },
    pricing_type:{
        type: String,
        required: true,
        enum: ["free", "paid", "freemium", "one_time_license", "subscription", "open_source", "other"],
    },
    verified:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }

});


export const Category =  mongoose.models.Category || mongoose.model('Category', categorySchema)
export default mongoose.models.PublicTool || mongoose.model('PublicTool', publicToolSchema)