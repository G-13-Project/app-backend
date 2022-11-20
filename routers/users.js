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
});

// user login
router.post('/login', async(req, res) => {
    // check email 
    const user = await User.findOne({email: req.body.email});
    const secret = process.env.secret;

    if(!user){
        return res.status(400).send('The user not found');
    }

    // check password
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).send({user: user.email, token: token});

    } else {
        res.status(400).send('Password is Wrong !');
    }
})

module.exports = router;