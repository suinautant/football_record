const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('match');
});

router.get('/:id', (req, res, next) => {
  res.render('match_detail', { id: req.params.id });
});

module.exports = router;
