const {required} = require("nodemon/lib/config");
const express = require('express');
const app = express();
require('dotenv/config');

const api = process.env.API_URL;

// http://localhost:3000/api/v1/
app.get('/', (req, res) => {
    res.send('<h1>Hello Ayurweda App !<h1>');
})

app.listen(3000, () => {
    console.log('Server is running......');
})