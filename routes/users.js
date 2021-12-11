const express = require('express');
const ejsLint = require('ejs-lint');
const router = express.Router();
const db = require('../common/dbconn');

// 가입
router.get('/join', (req, res, next) => {
    const ADMIN_ID = 'admin';
    const sql = 'SELECT * FROM users WHERE username = ?';
    const params = [ADMIN_ID];
    db.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.render('user/join', { rows: rows.length ? rows : 'ADMIN_ID_NOT_FOUND' });
    });
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

    res.send('<script>alert("test");</script>');
});

// 로그인
router.get('/login', (req, res, next) => {
    res.render('user/login', { title: 'login' });
});

module.exports = router;
