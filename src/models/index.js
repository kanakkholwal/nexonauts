import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    },

}, { timestamps: false });
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: Number,
        required: true
    },
    Branch: {
        type: String,
        required: true
    },

}, { timestamps: true });

const User = model('User', userSchema);
const Post = model('Post', postSchema);

export default { User, Post };