import mongoose from "mongoose";



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
    bannerImage:{
        type: String,
    },
    description:{
        type: mongoose.Schema.Types.Mixed || String,
        required: true
    },
    categories: [{
        name:{
            type:String,
            trim:true
        },
        slug:{
            type:String,
            unique:true,
            trim:true
        }
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
        trim:true,
        default:"other"
        // enum: ["free", "paid", "freemium", "one_time_license", "subscription", "open_source", "other"],
    },
    verified:{
        type: Boolean,
        default: false
    },
    author:{
        required:false,
        type:{
            name:String,
            email:String,
            public_link:String,
            userId:String || null
        },
        default:{
            name:"Kanak",
            email:"kanakkholwal@gmail.com",
            public_link:"https://kanakkholwal.eu.org",
            userId:null
        }
    }

});


export default mongoose.models.PublicTool || mongoose.model('PublicTool', publicToolSchema)