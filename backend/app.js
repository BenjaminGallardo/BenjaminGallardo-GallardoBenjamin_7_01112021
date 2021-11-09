const express = require('express');
const mysql = require('mysql');
const connectMysql = require('./mysql-config');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const userAuthRoutes = require('./routes/userAuth');
const memberRoutes = require('./routes/member');
const publicationRoutes = require('./routes/publication');

connectMysql.connect(function(err){
    if(err) throw err;
    console.log('Connected');
    connectMysql.query('SELECT * FROM user'), function (err, result){
        if(err) throw err;
        console.log(result);
    }
});

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next(); 
});

app.use('/api/auth', userAuthRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/publication', publicationRoutes);

module.exports = app;