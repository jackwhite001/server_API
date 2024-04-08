const bookModel = require('../models/bookModel');

const findBooks = async (obj, selectValue) => {
    return await bookModel.find(obj).select(selectValue).exec();
};
const findBook = async (obj, selectValue) => {
    return await bookModel.findOne(obj).exec();
};
const saveBook = async obj => {
    console.log(obj);
    let newBook = new bookModel();
    newBook = Object.assign(newBook, obj);
    return await newBook.save();
};
// filter： 一个mongoose对象，用于指示要更新的现有文档。
// update： 一个mongoose对象，将更新现有文档中的数据。
// new：布尔值，true 返回更新后的数据，false （默认）返回更新前的数据。
const updateBook = async (filter, update) => {
    return await bookModel.updateOne(filter, update, { new: true }).exec();
};
const deleteBook = async obj => {
    return await bookModel.deleteOne(obj).exec();
};
module.exports = { findBooks, findBook, saveBook, updateBook, deleteBook };
