const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'successful -GET',
        metadata: {
            hostname: req.hostname,
            methods: req.method,
        },
    });
});
router.post('/', (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    res.status(201).json({
        message: 'successful -GET',
        metadata: {
            name: name,
            hostname: req.hostname,
            methods: req.method,
        },
    });
});

router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Successful -GET by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
        },
    });
});
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Successful -DELETE by ID',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            methods: req.method,
        },
    });
});

module.exports = router;
