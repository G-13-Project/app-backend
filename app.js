const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const {json} = require('express');

const api = process.env.API_URL;

// for identify post request json file format in middleware

// import routers
const ordersRouter = require('./routers/orders');

app.use(express.json());
app.use(morgan('tiny'));

// use api routers
app.use(`${api}/orders`, ordersRouter);


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