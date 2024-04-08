const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const errorTemplate = require('../Template/error');
// encrypt use bcrypt
const mongoose = require('mongoose');
// middleware
const { authLogin, userRegister } = require('../middleware/userLogin');
// add random salt

router.post('/register', userRegister);
router.post('/login', authLogin);

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Successful -GET by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
        },
    });
});
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Successful -DELETE by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            methods: req.method,
        },
    });
});
router.post('/login', authLogin, (req, res, next) => {});
module.exports = router;
