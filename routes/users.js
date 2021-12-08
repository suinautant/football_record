var express = require('express');
var router = express.Router();

// 가입
router.get('/join', (req, res, next) => {
    res.render('user/join', { title: 'join' });
});

// 로그인
router.get('/login', (req, res, next) => {
    res.render('user/login', { title: 'login' });
});

module.exports = router;
