require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorTemplate } = require('../Template/error');
const messages = require('../utils/messages');
const auth = (req, res, next) => {
    try {
        // 'Bearer '
        const [, token] = req.headers.authorization.split(' ');
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        return errorTemplate(res, e, messages.auth_failed, 500);
    }
};
module.exports = auth;
