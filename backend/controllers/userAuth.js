const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectMysql = require('../mysql-config');
require('dotenv').config();

// Inscription de l'utilisateur 

module.exports.subscribe = (req, res) => {
    let usernameSyntax = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-\_\(\)]{2,}$/;
    let emailSyntax = /\S+@\S+\.\S+/;
    
    let verificationSyntaxForm = [
        usernameSyntax.test(req.body.username),
        emailSyntax.test(req.body.email),
    ];
    
    if(verificationSyntaxForm[0] == true && verificationSyntaxForm[1] == true){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            connectMysql.query("INSERT INTO user SET username=?, email=?, password=?", [req.body.username, req.body.email, hash],(err, result) => {
                if(!err){
                    res.status(200).json({message : 'Utilisateur créé'});
                } else {
                    res.status(500).json({error: "L'utilisateur existe déjà"});
                }
            })
        })
        .catch(error => res.status(500).json(error));
    } else {
        res.status(400).json({error: "Les données ne sont pas formatées correctement"});
    }
};

// Connexion de l'utilisateur

module.exports.connexion = (req, res) => {
    let emailSyntax = /\S+@\S+\.\S+/;
    let passwordSyntax = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-\.\*\$\?\!\^\%]{2,}$/;
    
    let verificationSyntaxForm = [
        emailSyntax.test(req.body.email),
        passwordSyntax.test(req.body.password)
    ];

    if(verificationSyntaxForm[0] == true && verificationSyntaxForm[1] == true) {
        connectMysql.query("SELECT id, username, email, password, admin FROM user WHERE email=?", [req.body.email], (err, result) => {
            if(result[0] == undefined){
                return res.status(401).json({error: 'Utilisateur introuvable'});
            } else {
                bcrypt.compare(req.body.password, result[0].password)
                .then(validation => {
                    if(!validation){
                        return res.status(401).json({error : 'Mot de passe incorrect'});
                    } else {
                        res.status(200).json({
                            userId: result[0].id,
                            admin: result[0].admin,
                            token: jwt.sign(
                                { userId: result[0].id },
                                process.env.TOKEN,
                                { expiresIn: '12h' }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json(error));
            }
        })
        
    } else {
        res.status(400).json({error: "Les données ne sont pas correctement formatées"});
    }
};