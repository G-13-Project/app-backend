const mongoose = require('mongoose');

const resPostSchema = mongoose.Schema({
    header: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    }
})

exports.ResPost = mongoose.model('ResPost', resPostSchema);