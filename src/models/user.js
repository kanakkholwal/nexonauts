import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator';



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Account already exists"],
        validate: [validator.isEmail, 'Please enter a valid email'],
        lowercase: true,
    },
    profileURl: {
        type: String,
        default: "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
        minLength: [6, "Your password must be at least 6 characters long"],
        select: false, //don't send back password after request
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ],
        }
    },
    account_type: {
        type: String,
        default: 'free',
        enum: {
            values: [
                'free',
                'premium'
            ],
        }

    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    }]

});

// ENCRYPTION 
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    // return await bcrypt.compare(enteredPassword, this.password)
    // let output = false;
    // bcrypt.compare(enteredPassword, this.password, (err, result) => {
    //     if (err) {
    //         throw err;
    //     }

    //     if (result)
    //         output = result;
    // });
    // return output;
    return  bcrypt.compare(enteredPassword, this.password)


}

    
UserSchema.methods.getPosts = async function () {
    return await this.populate('posts')
}


export default mongoose.models.User || mongoose.model('User', UserSchema)