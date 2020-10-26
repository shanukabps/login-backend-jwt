const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
var bcrypt = require('bcryptjs');
const Joi = require('joi');
const { User } = require('../model/user');


router.post('/', async (req, res) => {


    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.');


    const newtoken = user.generateAuthToken();


    res.send(newtoken)

});

function validate(user) {
    const schema = Joi.object().keys({

        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}


module.exports = router;