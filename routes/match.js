const express = require('express');
const router = express.Router();

// PR 로그
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('match', { title: 'match' });
});

module.exports = router;
