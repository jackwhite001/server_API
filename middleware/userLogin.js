const userModel = require('../models/userModel');
const { errorTemplate } = require('../Template/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const saltRounds = 10;
// commonJS
exports.userRegister = async (req, res) => {
    // userModel email password
    // find the user email
    // if the user is not be found
    // return a message use is not exist，please register
    // else the user is be found
    // use bcrypt to compare the password
    // if the password is not be matched
    // return a message return authorization failed
    // else the password is be matched
    // return a message return authorization success token
    console.log('from 3000', req.body.email);
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            // throw error
            throw new Error('This user already exist,Please try logging it');
        } else {
            // instanceof empty Schema Model add _id
            const User = new userModel();
            // create a new Object mapping to userModel
            let newUser = Object.assign(User, req.body);
            const hash = await bcrypt.hash(newUser.password, saltRounds);
            // Store hash in your password DB.
            newUser.password = hash;
            // save to collection
            const DbUser = await newUser.save();
            return res.status(200).json({
                message: 'successful resister',
                user: DbUser,
            });
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 500);
    }
};
exports.authLogin = async (req, res) => {
    // find email in or not in database
    try {
        // email
        const auth = await userModel.findOne({ email: req.body.email });
        // if not exist, throw error
        if (!auth) {
            throw new Error('Authorization Failed: unable to find user');
        } else {
            // auth exist ,use bcrypt compare
            const result = await bcrypt.compare(req.body.password, auth.password);
            // if match success ，allow to login
            if (result) {
                const token = jwt.sign({ user: auth }, JWT_SECRET);
                return res.status(200).json({
                    user: auth,
                    logged: true,
                    token: token,
                    message: 'Login Successful',
                });
            } else {
                // result is false ,password is incorrect Authorization failed
                throw new Error('Authorization Failed: email or password Incorrect');
            }
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 500);
    }
};
