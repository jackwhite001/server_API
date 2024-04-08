const errorTemplate = (res, err, message, status) => {
    return res.status(status).json({
        error: {
            message: message,
            err: err === 'undefined' ? '' : err,
            status: status,
        },
    });
};
module.exports = { errorTemplate };
