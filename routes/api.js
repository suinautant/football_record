const express = require('express');
const router = express.Router();
const db = require('../common/dbconn'); // DB 접속 정보

router.get('/match', (req, res, next) => {
  const sql = 'SELECT * FROM matches_record';
  const params = [];
  db.query(sql, params, async (err, rows, fields) => {
    if (err) throw err;
    return res.json(rows);
  });
});

module.exports = router;
