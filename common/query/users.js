const db = require('../dbconn');

exports.getUsernameWhereAdmin = (req, res) => {
    db.connect();

    db.query('SELECT * from users', (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].username);
    });

    db.end();
};
