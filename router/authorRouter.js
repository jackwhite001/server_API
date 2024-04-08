const express = require('express');
const router = express.Router();
const {
    postAuthor,
    getAuthors,
    getAuthorById,
    patchAuthor,
    deleteAuthor,
} = require('../middleware/authorService');
const auth = require('../auth/authorization');

router.get('/', [auth, getAuthors]);

router.get('/:authorId', [auth, getAuthorById]);

router.post('/', [auth, postAuthor]);
router.patch('/:authorId', [auth, patchAuthor]);
router.delete('/:authorId', [auth, deleteAuthor]);

module.exports = router;
