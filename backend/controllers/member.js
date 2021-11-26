const connectMysql = require('../mysql-config');

// Récupération de tout les membres

module.exports.getAllMembers = (req, res) => {
    connectMysql.query('SELECT * FROM user', (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            res.status(500).json(err);
        }
    });
};

// Récupération d'une profil d'un seul membre

module.exports.getOneMember = (req, res) => {
    connectMysql.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            res.status(500).json(err);
        }
    });
};