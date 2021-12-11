const express = require('express');
const ejsLint = require('ejs-lint');
const router = express.Router();
const db = require('../common/dbconn');
const { ExpectationFailed } = require('http-errors');

const ADMIN_ID = 'admin';

const isAdmin = (username) => {
    if (username === ADMIN_ID) return true;
    else return false;
};

// 가입
router.get('/join', (req, res, next) => {
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

    if (!isAdmin(username)) {
        return res.send(' <script> alert("admin의 가입만 가능합니다."); location.href="/users/join"; </script> ');
    }

    const sql = 'INSERT INTO users(username, password) VALUES (?, ?)';
    const params = [username, password];
    db.query(sql, params, (err, rows, fields) => {
        if (err) return res.send(err);
        return res.send(' <script> alert("가입 완료"); location.href="/users/login"; </script> ');
    });
});

// 로그인
router.get('/login', (req, res, next) => {
    res.render('user/login', { title: 'login' });
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('username : ' + username);
    console.log('password : ' + password);

    const sql = 'SELECT password FROM users WHERE username = ? ';
    const params = [username, password];
    db.query(sql, params, (err, rows, fields) => {
        if (err) return res.send(err);
        return res.send(' <script> alert("가입 완료"); location.href="/users/login"; </script> ');
    });

    res.render('user/login', { title: 'login' });
});

module.exports = router;
