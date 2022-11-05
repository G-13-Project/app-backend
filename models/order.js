const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    doc_id: {
        type: String,
        required: true,
    },
    plant_name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    quantity: {
        type: String,
        required: true,
    },
});

exports.Order = mongoose.model('Order', orderSchema);