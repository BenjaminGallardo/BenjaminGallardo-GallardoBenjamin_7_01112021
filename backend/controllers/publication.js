const connectMysql = require('../mysql-config');

module.exports.getAllPublication = (req, res) => {
    connectMysql.query('SELECT * FROM publication', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json(result)
        }
    })
};

module.exports.createPublication = (req, res) => {
    connectMysql.query('INSERT INTO publication SET userId=?, textField=?, imageUrl=?', [req.body.userId, req.body.textField, req.body.imageUrl],(err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("Publication créée");
            res.status(200).json({message : result})
        }
    })
};

module.exports.modifyPublication = (req, res) => {

};

module.exports.deletePublication = (req, res) => {
};
