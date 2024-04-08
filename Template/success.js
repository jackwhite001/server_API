const successTemplate = (res, data, message, status, bool, token) => {
    return res.status(status).json({
        result: {
            message: message,
            data: data,
            logged: bool,
            token: token,
        },
    });
};

module.exports = { successTemplate };
