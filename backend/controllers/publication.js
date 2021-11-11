const connectMysql = require('../mysql-config');
const fs = require('fs');

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
    connectMysql.query('SELECT * FROM publication WHERE id=?', [req.body.id], (err, result) => {
        if(err){
            res.status(400).json({error : "La publication n'existe pas"})
        } else {
            const publication = result[0];
            const filename = publication.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                connectMysql.query('DELETE FROM publication WHERE id=?', publication.id, (err, result) => {
                    if(err) {
                        res.status(400).json({error : "La publication n'existe pas"})
                    } else {
                        res.status(200).json({message: 'Publication Supprimée'});
                    }
                })
            })
        }
    })
};
