var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

/* GET test page. */
router.get('/test', (req, res, next) => {
    res.render('index', { title: 'TEST' });
});

module.exports = router;
