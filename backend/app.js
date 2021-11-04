const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mysql = require('mysql');
require('dotenv').config();

const connectMysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7axgU8<?5Q",
    database: "groupomania"
});

connectMysql.connect(function(err){
    if(err) throw err;
    console.log('Connected');
    connectMysql.query('SELECT * FROM user'), function (err, result){
        if(err) throw err;
        console.log(result);
    }
});

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next(); 
});

app.get('/home', (req, res) => {
    connectMysql.query('SELECT * FROM user', (err, result) => {
        if(!err) {
            res.status(200).json(result);
        } else {
            console.log(err);
        }
    })
});

app.get('/member/:id', (req, res) => {
    connectMysql.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            console.log(err);
        }
    })
});

module.exports = app;