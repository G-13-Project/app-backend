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

// post order
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

// update orders
router.put('/put/:id', async(req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            plant_name: req.body.plant_name,
            note: req.body.note,
            quantity: req.body.quantity
        },
        {new: true} // if not update, return old data after put request
    )
    if(!order){
        return res.status(404).send('The order cannot be created!');
    }

    res.send(order);
});

// delete order
router.delete('/delete/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if(order){
            return res.status(200).json({success: true, message: 'The Order was deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'The Order is not funded!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})


module.exports = router;