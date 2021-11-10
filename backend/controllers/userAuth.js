const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectMysql = require('../mysql-config');
require('dotenv').config();

// Inscription de l'utilisateur 

module.exports.subscribe = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        connectMysql.query("INSERT INTO user SET username=?, email=?, password=?", [req.body.username, req.body.email, hash],(err, result) => {
            if(!err){
                console.log("Utilisateur Crée");
                res.status(200).json({message : 'Utilisateur créé'})
            } else {
                console.log(error => res.status(500).json(error));
            }
        })
    })
    .catch(error => res.status(500).json(error));
};

// Connexion de l'utilisateur

module.exports.connexion = (req, res) => {
    connectMysql.query(`SELECT id, username, email, password FROM user WHERE email=?`, [req.body.email], (err, result) => {
        if(result[0] == undefined){
            return res.status(401).json({error: 'Utilisateur introuvable'})
        } else {
            bcrypt.compare(req.body.password, result[0].password)
            .then(validation => {
                if(!validation){
                    return res.status(401).json({error : 'Mot de passe incorrect'});
                } else {
                    res.status(200).json({
                        userId: result[0].id,
                        token: jwt.sign(
                            { userId: result[0].id },
                            process.env.TOKEN,
                            { expiresIn: '12h' }
                        )
                    });
                }
                console.log('Requête reçue');
            })
            .catch(error => res.status(500).json(error));
        }
    })
};

