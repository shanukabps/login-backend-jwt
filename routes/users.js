const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
var bcrypt = require('bcryptjs');
const { User, validate } = require('../model/user');
const auth = require('../middleware/auth')



router.post('/', async (req, res) => {
    console.log(req.body)

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');


    // user = new User(

    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password

    // )//_.pick same
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'role', 'lastname', 'token']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const newtoken = user.generateAuthToken();
    res.header('x-auth-token', newtoken).send(_.pick(user, ['_id', 'name', 'email']));

});


module.exports = router;