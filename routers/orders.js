const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();

// http://localhost:3000/api/v1/
router.get(`/get`, async (req, res) => {
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false});
    }
    res.send(orderList);
});

router.post(`/post`, (req, res) => {
    const order = new Order({
        doc_id: req.body.doc_id,
        plant_name: req.body.plant_name,
        note: req.body.note,
        quantity: req.body.quantity
    })

    order.save().then((createOrder => {
        res.status(201).json(createOrder)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
  
});

module.exports = router;