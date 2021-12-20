require('dotenv').config();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Database,
});

module.exports = db;
