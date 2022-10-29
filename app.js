const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const api = process.env.API_URL;

// for identify post request json file format in middleware
app.use(express.json());
app.use(morgan('tiny'));


const orderSchema = mongoose.Schema({
    Doc_id: {
        type: String,
        required: true
    },
    Plant_Name: {
        type: String,
        required: true,
    },
    Comment: {
        type: String,
        required: true,
    },
    Rating: Number
});

const Order = mongoose.model('Order', orderSchema);

// http://localhost:3000/api/v1/
app.get(`${api}/orders/get`, async (req, res) => {
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false});
    }
    res.send(orderList);
})

app.post(`${api}/orders/post`, (req, res) => {
    const order = new Order({
        Doc_id: req.body.Doc_id,
        Plant_Name: req.body.Plant_Name,
        Comment: req.body.Comment,
        Rating: req.body.Rating
    });

    order.save().then((createOrder => {
        res.status(201).json(createOrder)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// connect db
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
})
.then(() => {
    console.log('Database connection is ready......');
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log('Server is running......');
})