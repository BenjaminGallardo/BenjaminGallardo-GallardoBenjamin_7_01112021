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
    console.log(req.body);
    const newPublication = {
         userId: '55', //req.body.userId,
        textField: req.body.textField,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    connectMysql.query('INSERT INTO publication SET userId=?, textField=?, imageUrl=?', [newPublication.userId, newPublication.textField, newPublication.imageUrl],(err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("Publication créée");
            res.status(201).json({message : "Publication créé"})
        }
    })
};

module.exports.modifyPublication = (req, res) => {

};

module.exports.deletePublication = (req, res) => {
};
