const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register user
router.post('/register', async(req, res) => {
    let user = new User({
        title: req.body.title,
        fname: req.body.fname,
        lname: req.body.lname,
        contact_no: req.body.contact_no,
        nic: req.body.nic,
        district: req.body.district,
        email: req.body.email,
        slme_no: req.body.slme_no,
        address: req.body.address,
        passwordHash: bcrypt.hashSync(req.body.password, 10), // use password keyword to postmon or frontedn
        isAdmin: req.body.isAdmin
    })

    user = await user.save();

    if(!user){
        return res.status(404).send('The user cannot be created!');
    }

    res.send(user);
})

module.exports = router;