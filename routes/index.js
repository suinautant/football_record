const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');

/* GET home page. */
router.get('/', auth, (req, res, next) => {
    // router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;
