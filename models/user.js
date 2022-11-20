const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    contact_no: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    slme_no: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

exports.User = mongoose.model('User', userSchema);