const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
// 引入加密bcrypt
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
// 添加随机盐
const saltRounds = 10;
router.post('/register', (req, res, next) => {
    userModel
        .findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                console.log('req' + req.body.email, 'res' + user);
                return res.status(409).json({
                    message: 'This user already exist,Please try logging it',
                });
            } else {
                // instanceof empty Schema Model add _id
                const User = new userModel();
                // create a new Object mapping to userModel
                let newUser = Object.assign(User, req.body);
                console.log(User.password, newUser.password);
                bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                    // Store hash in your password DB.
                    if (err) {
                        return res.status(501).json({
                            message: 'ERROR:' + err.message,
                        });
                    } else {
                        newUser.password = hash;
                        // save to collection
                        newUser
                            .save()
                            .then(DbUser => {
                                return res.status(200).json({
                                    message: 'successful resister',
                                    user: DbUser,
                                });
                            })
                            .catch(err => {
                                return res.status(501).json({
                                    message: 'ERROR:' + err.message,
                                });
                            }); // back to promise object，you can use .then.catch capture
                    }
                });
            }
        })
        .catch(err => {
            res.json({
                message: 'ERROR: ' + err.message,
            });
        });
});
router.post('/data', (req, res, next) => {
    userModel
        .create({
            // _id: mongoose.Schema.Types.ObjectId,
            ...req.body,
        })
        .then(data => {
            console.log(data);
            res.json({
                message: 'successful -POST',
                data: {
                    ...data,
                },
            });
        })
        .catch(err => {
            console.log(err);
        });
});

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

module.exports = router;
