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

router.get('/', (req, res, next) => {
    console.log(rawDatabase);
    res.render('match', { title: 'match', data: rawDatabase });
});

module.exports = router;
