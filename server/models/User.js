const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,  
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedusers: {
        type: [String],
    },
    fromgoogle: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema );

module.exports = User;