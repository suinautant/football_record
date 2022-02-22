const express = require('express');
const router = express.Router();
const db = require('../common/dbconn'); // DB 접속 정보
const query = require('./../sql/query');

router.get('/match', (req, res, next) => {
  const sql = query.match.list;
  const params = [];
  db.query(sql, params, async (err, rows, fields) => {
    if (err) throw err;
    return res.json(rows);
  });
});

router.get('/match/:id', (req, res, next) => {
  const matchId = req.params.id;
  const sql = query.match.listId;
  const params = [matchId];
  db.query(sql, params, async (err, rows, fields) => {
    if (err) throw err;
    return res.json(rows);
  });
});

module.exports = router;
