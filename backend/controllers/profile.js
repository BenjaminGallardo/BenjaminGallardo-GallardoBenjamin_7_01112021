const connectMysql = require('../mysql-config');
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports.getProfile = (req, res) => {
    connectMysql.query(`SELECT * FROM user WHERE id=?`, [req.body.id], (err, result) => {
        if(err){
            res.status(500).json({error : "Les informations n'ont pas pu être récupérées"})
        } else {
            res.status(200).json(result[0])
        }
    })
};

module.exports.modifyEmail = (req, res) => {
    let emailSyntax = /\S+@\S+\.\S+/;
    let verificationSyntaxEmail = emailSyntax.test(req.body.email);

    if(verificationSyntaxEmail == true){
        connectMysql.query(`UPDATE user SET email=? WHERE id=?`, [req.body.email, req.body.id], (err, result) => {
            if(err){
                res.status(500).json({error: "L'email n'a pas pu être modifié"});
            } else {
                res.status(200).json({message: "Email Modifié"});
            }
        })
    } else {
        res.status(500).json({error: "L'email n'a pas le bon format"})
    }

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
                                    res.status(200).json({message: "Mot de passe modifié"})
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
        res.status(500).json({error: "Les données ne sont pas formatées correctement"});
    }
}

module.exports.modifyBio = (req, res) => {
    console.log(req.body);
    connectMysql.query('UPDATE user SET bio=? WHERE id=?', [req.body.bio, req.body.id], (err, result) => {
        if(err){
            res.status(500).json({error : "La bio n'a pas pu être modifiée"});
        } else {
            res.status(200).json({message: "Bio Modifié"});
        }
    })
};

module.exports.modifyProfileImage = (req, res) => {
   if(req.file == undefined){
       connectMysql.query('UPDATE user SET imageUrl=? WHERE id=?', ['http://localhost:3001/images/Image_profile-default.png1637830252800.png', req.body.id], (err, result) => {
           if(err){
               console.log(err);
           } else {
            res.status(200).json(result);
           }
       })
   } else {
        connectMysql.query('SELECT * FROM user WHERE id=?', [req.body.id], (err, result) => {
            if(err){
                console.log(err);
            } else {
                const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

                if(result[0].imageUrl === 'http://localhost:3001/images/Image_profile-default.png1637830252800.png'){
                    connectMysql.query('UPDATE user SET imageUrl=? WHERE id=?', [imageUrl, req.body.id], (err, result) => {
                        if(err){
                            console.log(error);
                        } else {
                            res.status(200).json(result);
                        }
                    })
                } else {
                    const oldFilename = result[0].imageUrl.split('/images/')[1]
                    fs.unlink(`images/${oldFilename}`, () => {
                        connectMysql.query('UPDATE user SET imageUrl=? WHERE id=?', [imageUrl, req.body.id], (err, result) => {
                            if(err){
                                console.log(error);
                            } else {
                                res.status(200).json(result);
                            }
                        })
                    })
                }
            }
        })
   }
};

module.exports.deleteAccount = (req, res) => {
    connectMysql.query('SELECT * FROM user WHERE id=?', [req.body.id], (err, result) => {
        if(err){
            res.status(400).json({error : "La publication n'existe pas"})
        } else {    
            const user = result[0];

            if(user.imageUrl === 'http://localhost:3001/images/Image_profile-default.png1637830252800.png'){
                connectMysql.query('DELETE FROM user WHERE id=?', user.id, (err, result) => {
                    if(err) {
                        res.status(400).json({error : "L'utilisateur n'existe pas"})
                    } else {
                        res.status(200).json({message: 'Utilisateur supprimé'});
                    }
                })
            } else {
                const oldFilename = user.imageUrl.split('/images/')[1]
                fs.unlink(`images/${oldFilename}`, () => {
                    connectMysql.query('DELETE FROM user WHERE id=?', user.id, (err, result) => {
                        if(err) {
                            res.status(400).json({error : "L'utilisateur n'existe pas"})
                        } else {
                            res.status(200).json({message: 'Utilisateur supprimé'});
                        }
                    })
                })
            }
        }
    })
};