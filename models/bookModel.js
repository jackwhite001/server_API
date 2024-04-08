const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    ISBN: {
        type: String,
        require: true,
    },
    numberOfPages: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    yearPublished: {
        type: Number,
        require: true,
    },
});
const bookModel = mongoose.model('book', bookSchema);
module.exports = bookModel;
