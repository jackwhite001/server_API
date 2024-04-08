const mongoose = require('mongoose');
const authorModel = require('../models/authorModel');
const { errorTemplate } = require('../Template/error');
const { successTemplate } = require('../Template/success');
const {
    findAuthorById,
    saveAuthor,
    findAuthors,
    updateAuthor,
    deleteAuthor,
} = require('../database/authorDb');
const messages = require('../utils/messages');
const isEmpty = require('../utils/util');
exports.postAuthor = async (req, res) => {
    try {
        const author = await findAuthorById({ name: req.body.name, book: req.body.book });
        // if find author
        console.log(!author);
        // throw
        if (!author) {
            let authorSub = new authorModel();
            let mergeAuthor = Object.assign(authorSub, req.body);
            console.log(mergeAuthor);
            const authors = await saveAuthor(mergeAuthor);
            return successTemplate(res, authors, messages.author_add, 200);
        } else {
            return errorTemplate(res, author, messages.author_exist, 409);
        }
        // else
        // make our author use Object.assign
        // and save
    } catch (e) {
        console.log('e', e);
        return errorTemplate(res, e, messages.author_add_failed, 500);
    }
};

exports.getAuthors = async (req, res) => {
    try {
        // findAuthor return result
        const authors = await findAuthors({});
        console.log(isEmpty(authors));
        if (isEmpty(authors)) {
            // if(empty) return error
            return errorTemplate(res, authors, messages.author_id_failed, 409);
        } else {
            return successTemplate(res, authors, messages.author_id_Found, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, messages.author_found_failed, 500);
    }
};
exports.getAuthorById = async (req, res) => {
    try {
        console.log(req.params.authorId);
        const author = await findAuthorById({ _id: req.params.authorId });
        console.log(author);
        if (!author) {
            // if(empty) return error
            return errorTemplate(res, author, messages.author_id_failed, 409);
        } else {
            return successTemplate(res, author, messages.author_id_Found, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, messages.author_found_failed, 500);
    }
};
exports.patchAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        // by id find author and assign req.body
        const mergeAuthor = await updateAuthor({ _id: id }, req.body);
        //
        console.log(!mergeAuthor.matchedCount);
        if (!mergeAuthor.matchedCount) {
            return errorTemplate(res, mergeAuthor, messages.author_id_failed, 409);
        } else {
            return successTemplate(res, mergeAuthor, messages.author_update, 200);
        }
    } catch (e) {
        return errorTemplate(res, e, messages.author_update_failed, 500);
    }
};
exports.deleteAuthor = async (req, res) => {
    try {
        const id = req.params.authorId;
        const author = await deleteAuthor({ _id: id });
        if (!author.deletedCount) {
            return errorTemplate(res, author, messages.author_id_failed, 409);
        } else {
            return successTemplate(res, author, messages.author_delete, 200);
        }
    } catch (e) {
        console.log('e', e);
        return errorTemplate(res, e, messages.author_delete_failed, 500);
    }
};
