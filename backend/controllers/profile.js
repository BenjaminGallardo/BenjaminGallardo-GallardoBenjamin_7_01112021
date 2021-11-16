const connectMysql = require('../mysql-config');
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports.getProfile = (req, res) => {
    connectMysql.query(`SELECT * FROM user`, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json(result)
        }
    })
};

module.exports.modifyEmail = (req, res) => {
    connectMysql.query(`UPDATE user SET email=? WHERE id=?`, [req.body.email, req.body.id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json({message: "Email Modifié"})
        }
    })
};

module.exports.modifyPassword = (req, res) => {
    let passwordSyntax = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-\.\*\$\?\!\^\%]{2,}$/;
    let verificationSyntaxForm = [
        passwordSyntax.test(req.body.oldPassword.password),
        passwordSyntax.test(req.body.newPassword.password)
    ];

    if(verificationSyntaxForm[0] == true && verificationSyntaxForm[1] == true){
        connectMysql.query("SELECT password FROM user WHERE id=?", [req.body.id], (err, result) => {
            if(err){
                console.log(err);
            } else {
                bcrypt.compare(req.body.oldPassword.password, result[0].password)
                .then(validation => {
                    if(!validation){
                        return res.status(401).json({error : 'Ancien mot de passe incorrect'});
                    } else {
                        bcrypt.hash(req.body.newPassword.password, 10)
                        .then(hash => {
                            connectMysql.query('UPDATE user SET password=? WHERE id=?', [hash, req.body.id], (err, result) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    res.status(200).json({message: "Mot de passe Modifié"})
                                }
                            })
                        })
                        .catch(error => res.status(500).json(error));
                    }
                })
                .catch(error => res.status(500).json(error));
            }
        })
    } else {
        res.status(400).json({error: "Les données ne sont pas formatées correctement"});
    }
}
    


module.exports.modifyBio = (req, res) => {
    connectMysql.query('UPDATE user SET bio=? WHERE id=?', [req.body.bio, req.body.id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json({message: "Bio Modifié"})
        }
    })
};

module.exports.modifyProfileImage = (req, res) => {
};

module.exports.deleteAccount = (req, res) => {
    connectMysql.query('SELECT * FROM user WHERE id=?', [req.body.id], (err, result) => {
        if(err){
            res.status(400).json({error : "La publication n'existe pas"})
        } else {       
        const user = result[0];
            connectMysql.query('DELETE FROM user WHERE id=?', user.id, (err, result) => {
                if(err) {
                    res.status(400).json({error : "L'utilisateur n'existe pas"})
                } else {
                    res.status(200).json({message: 'Utilisateur Supprimée'});
                }
            })
        }
    })
};