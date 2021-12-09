const express = require('express');
const router = express.Router();
const sql = require('../common/dbconn');
const query_users = require('../common/query/users');

query_users.getUsernameWhereAdmin();

// 가입
router.get('/join', (req, res, next) => {
    res.render('user/join', { title: 'join' });
});

router.post('/join', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('username : ' + username);
    console.log('password : ' + password);

    if (username !== 'admin') {
        res.send('admin의 가입만 가능합니다.');
        res.end();
    }

    res.render('user/join', { title: 'join' });
});

// 로그인
router.get('/login', (req, res, next) => {
    res.render('user/login', { title: 'login' });
});

module.exports = router;
