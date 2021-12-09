const express = require('express');
const router = express.Router();
const config = require('../config/dbconfig');
// ../config/dbconfig
// host: 'localhost',
// user: 'username',
// password: 'password',
// database: 'fbrecord',
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

connection.connect();

connection.query('SELECT * from users', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].username);
});

connection.end();

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
