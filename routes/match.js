const express = require('express');
const router = express.Router();

// PR 로그
// PR 로그 #2
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('match', { title: 'match' });
});

module.exports = router;
