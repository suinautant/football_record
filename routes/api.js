const express = require('express');
const router = express.Router();

const rawDatabase = {
  otherTeam: '경주한수원',
  date: '2020-2-3 19:00',
  location: '김해운동장',
  points: 3,
  goalsFor: 2,
  goalsAgainst: 1,
  home: true,
};

router.get('/match', (req, res, next) => {
  return res.json(rawDatabase);
});

module.exports = router;
