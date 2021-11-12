const connectMysql = require('../mysql-config');
const fs = require('fs');

module.exports.getProfile = (req, res) => {
};

module.exports.modifyEmail = (req, res) => {
    console.log(req.body);
    connectMysql.query(`UPDATE user SET email=? WHERE id=?`, [req.body.email, req.body.id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json({message: "Email Modifié"})
        }
    })
};

module.exports.modifyPassword = (req, res) => {
};

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