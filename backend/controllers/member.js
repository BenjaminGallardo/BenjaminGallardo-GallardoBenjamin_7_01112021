const connectMysql = require('../mysql-config');

module.exports.getAllMembers = (req, res) => {
    connectMysql.query('SELECT * FROM user', (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            console.log(err);
        }
    })
};

module.exports.getOneMember = (req, res) => {
    connectMysql.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => {
        if(!err){
            res.status(200).json(result);
        } else {
            console.log(err);
        }
    })
};