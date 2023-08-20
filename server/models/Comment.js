const mongoose  = require("mongoose");

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true, 
    },
    videoId: {
        type: String,
        required: true, 
    },
    message: {
        type: String,
        required: true, 
    }, 
}, {
    timestamps: true
})

const Comment = mongoose.model('comment', commentSchema );

module.exports = Comment;