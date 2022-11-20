const mongoose = require('mongoose');

const docPostSchema = mongoose.Schema({
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

exports.DocPost = mongoose.model('DocPost', docPostSchema);