require('dotenv').config(); // .env variable
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ejsLint = require('ejs-lint'); // ejs 문법 점검
const db = require('../common/dbconn'); // DB 접속 정보
const { ExpectationFailed } = require('http-errors');
const crypto = require('crypto'); // 비밀번호 암호화

const ADMIN_ID = 'admin'; // 관리자 ID
const JWT_KEY = process.env.JWT_KEY; // jasonwebtoken secret key

// 관리자 ID 확인
const isAdmin = (username) => {
    if (username === ADMIN_ID) return true;
    else return false;
};

// 패스워드 암호화 salt 생성
const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

// salt와 암호화 된 패스워드 생성
const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

// 암호화 된 패스워드 생성
const makePasswordHashed = (plainPassword, salt) =>
    new Promise(async (resolve, reject) => {
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

// 가입
router.get('/join', (req, res, next) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const params = [ADMIN_ID];
    db.query(sql, params, (err, rows, fields) => {
        if (err) throw err;
        res.render('user/join', { rows: rows.length ? rows : 'ADMIN_ID_NOT_FOUND' });
    });
});

router.post('/join', async (req, res, next) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;

    if (!isAdmin(reqUsername)) {
        return res.send(' <script> alert("admin의 가입만 가능합니다."); location.href="/users/join"; </script> ');
    }

    const username = reqUsername;
    const { password, salt } = await createHashedPassword(reqPassword);
    const sql = 'INSERT INTO users(username, password, salt) VALUES (?, ?, ?)';
    const params = [username, password, salt];
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
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;

    if (!isAdmin(reqUsername)) {
        return res.send(' <script> alert("admin의 로그인만 가능합니다."); location.href="/users/login"; </script> ');
    }

    const sql = 'SELECT * FROM users WHERE username = ? ';
    const params = [ADMIN_ID];
    db.query(sql, params, async (err, rows, fields) => {
        if (err) return res.send(err);

        const password = await makePasswordHashed(reqPassword, rows[0].salt);
        if (rows[0].password === password) {
            // JWT 생성
            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            token = jwt.sign(
                {
                    type: 'JWT',
                    id: 'admin',
                    // exp: 30초
                    // exp: Math.floor(Date.now() / 1000) - 30,
                },
                JWT_KEY,
                {
                    expiresIn: '60m',
                }
            );
            //response
            return res.status(200).json({
                code: 200,
                message: '토큰이 발급되었습니다.',
                token: token,
            });

            // return res.send(' <script> alert("로그인 성공"); location.href="/"; </script> ');
        } else return res.send(' <script> alert("비밀번호가 다릅니다."); location.href="/users/login"; </script> ');
    });
});

module.exports = router;
