const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        require: false,
    },
    twitter: {
        type: String,
        require: false,
    },
    about: {
        type: String,
        require: true,
    },
});

const authorModel = mongoose.model('Author', authorSchema);

module.exports = authorModel;
