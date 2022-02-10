const field = {
  match_date: 'date',
};

const match = {
  list: 'SELECT * FROM matches_record ORDER BY ' + field.match_date + ' DESC',
};

const exam = {
  table: 'SELECT * FROM matches_record',
};

module.exports = { match, exam };
