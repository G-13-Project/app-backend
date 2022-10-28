const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const api = process.env.API_URL;

// for identify post request json file format in middleware
app.use(express.json());
app.use(morgan('tiny'));



// http://localhost:3000/api/v1/
app.get(`${api}/orders/get`, (req, res) => {
    res.send('<h1>Hello Ayurweda App !<h1>');
})

app.post(`${api}/orders/post`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
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