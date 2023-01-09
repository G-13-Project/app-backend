const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
// http request
app.options('*', cors());

// for indentify post request json file format (Middleware)
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

const api = process.env.API_URL;

// import routers
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const docPostRouter = require('./routers/docPosts');
const resPostRouter = require('./routers/resPosts');


// use api routers
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/docpost`, docPostRouter);
app.use(`${api}/respost`, resPostRouter);


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

// chage port 3000
app.listen(3000, () => {
    console.log('Server is running......');
})