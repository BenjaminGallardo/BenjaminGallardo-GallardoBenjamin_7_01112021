const mysql = require('mysql');
require('dotenv').config();

let connectMysql = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.BDDUSER,
    password: process.env.BDDPASSWORD,
    database: process.env.DATABASE
});

module.exports = connectMysql;