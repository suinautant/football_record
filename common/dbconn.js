const config = require('../config/dbconfig');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

module.exports = db;
