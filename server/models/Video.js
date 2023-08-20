const mongoose  = require("mongoose");

const videoSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true, 
    },
    desc: {
        type: String,
        required: true, 
    },
    imgUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true, 
    },
    tags: {
        type: [String], 
        default: []
    },
    views: {
        type:  Number, 
        default: 0,
    },
    likes: {
        type: [String], 
        default: [] 
    },
    dislikes: {
        type: [String], 
        default: []
    }
}, {
    timestamps: true
})

const Video = mongoose.model('video', videoSchema );

module.exports = Video;