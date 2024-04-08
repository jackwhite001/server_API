const authorModel = require('../models/authorModel');
const mongoose = require('mongoose');

const saveAuthor = async newAuthor => {
    return await newAuthor.save();
};

const findAuthors = async obj => {
    return await authorModel.find(obj).populate('book').select('-_v').exec();
};

const findAuthorById = async obj => {
    return await authorModel.findOne(obj).populate('book').select('-_v').exec();
};
const updateAuthor = async (filter, update) => {
    return await authorModel.updateOne(filter, update, { new: true }).exec();
};
const deleteAuthor = async obj => {
    return await authorModel.deleteOne(obj).exec();
};
module.exports = { saveAuthor, findAuthors, findAuthorById, updateAuthor, deleteAuthor };
