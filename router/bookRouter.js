const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getAllBookIds,
    getBookById,
    postBooks,
    updateBooks,
    deleteBooks,
} = require('../middleware/bookService');
const auth = require('../auth/authorization');

router.get('/', [auth, getAllBooks]);
router.get('/books', [auth, getAllBookIds]);
router.get('/:bookId', [auth, getBookById]);

router.post('/', [auth, postBooks]);

router.put('/:bookId', [auth, updateBooks]);
router.delete('/:bookId', [auth, deleteBooks]);

module.exports = router;
