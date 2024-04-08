const { errorTemplate } = require('../Template/error');
const { successTemplate } = require('../Template/success');
const { findBooks, findBook, saveBook, updateBook, deleteBook } = require('../database/bookDb');
const messages = require('../utils/messages');
const bookModel = require('../models/bookModel');
const isEmpty = require('../utils/util');
exports.getAllBooks = async (req, res) => {
    try {
        const books = await findBooks({}, '-_v');
        console.log(books);
        if (isEmpty(books)) {
            return errorTemplate(res, books, messages.books_not_found, 409);
        } else {
            return successTemplate(res, books, messages.books_found, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 500);
    }
};
exports.getAllBookIds = async (req, res) => {
    try {
        const books = await findBooks({}, '_id, title');
        console.log(books);
        if (isEmpty(books)) {
            return errorTemplate(res, books, messages.books_id_failed, 409);
        } else {
            return successTemplate(res, books, messages.books_id_Found, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 500);
    }
};
exports.getBookById = async (req, res) => {
    try {
        const books = await findBooks({ _id: req.params.bookId }, '-_v');
        if (isEmpty(books)) {
            return errorTemplate(res, books, messages.books_not_found, 409);
        } else {
            return successTemplate(res, books, messages.books_found, 200);
        }
    } catch (e) {
        console.log('e', e);
        return errorTemplate(res, e, e.message, 500);
    }
};
exports.postBooks = async (req, res) => {
    try {
        // const bookSub = new bookModel();
        // const mergeBook = Object.assign(bookSub, req.body);
        const books = await findBook(req.body);
        console.log('post', books);
        if (!books) {
            const addBooks = await saveBook(req.body);
            return successTemplate(res, addBooks, messages.books_add, 200);
        } else {
            return errorTemplate(res, books, messages.books_exist, 409);
        }
    } catch (e) {
        return errorTemplate(res, e, e.message, 500);
    }
};
exports.updateBooks = async (req, res) => {
    try {
        const id = req.params.bookId;
        const books = await updateBook({ _id: id }, req.body);
        console.log('books', !books.matchedCount);
        if (!books.matchedCount) {
            return errorTemplate(res, books, messages.books_id_failed, 409);
        } else {
            return successTemplate(res, books, messages.books_update, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, messages.books_update_failed, 500);
    }
};
exports.deleteBooks = async (req, res) => {
    try {
        const id = req.params.bookId;
        const books = await deleteBook({ _id: id });
        // console.log(books.deletedCount);
        if (!books.deletedCount) {
            return errorTemplate(res, books, messages.books_id_failed, 409);
        } else {
            return successTemplate(res, books, messages.books_delete, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, messages.books_delete_failed, 500);
    }
};
