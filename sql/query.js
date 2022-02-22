const table = {
  MATCH: 'matches',
};

const field = {
  match_date: 'date',
};

const match = {
  list: 'SELECT * FROM ' + table.MATCH + ' ORDER BY ' + field.match_date + ' DESC',
  listId: 'SELECT * FROM ' + table.MATCH + ' WHERE idx= ? ',
};

const exam = {
  table: 'SELECT * FROM matches_record',
};

module.exports = { match, exam };
