const connectMysql = require('../mysql-config');
const fs = require('fs');
const { connect } = require('../mysql-config');

module.exports.getAllPublication = (req, res) => {
    connectMysql.query('SELECT * FROM publication ORDER BY id DESC', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json(result)
        }
    })
};

module.exports.getOnePublication = (req, res) => {
    connectMysql.query('SELECT * FROM publication WHERE id=?', [req.params.id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json(result);
        }
    })
};

module.exports.createPublication = (req, res) => {
    var date = new Date();
    var options = { year: "numeric", month: "long", day: "2-digit"};

    const newPublication = {
        userId: '55', //req.body.userId,
        textField: req.body.textField,
        date: `${date.toLocaleDateString("fr-FR", options)} à ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`
    }

    if(req.file === undefined){
        connectMysql.query('INSERT INTO publication SET userId=?, textField=?, date=?', [newPublication.userId, newPublication.textField, newPublication.date],(err, result) => {
            if(err){
                console.log(err);
            } else {
                console.log("Publication créée");
            }
        })
    } else {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        connectMysql.query('INSERT INTO publication SET userId=?, textField=?, imageUrl=?, date=?', [newPublication.userId, newPublication.textField, imageUrl, newPublication.date],(err, result) => {
            if(err){
                console.log(err);
            } else {
                console.log("Publication créée");
            }
        })
    }
};

module.exports.modifyPublication = (req, res) => {
    if(req.file === undefined){
        connectMysql.query('UPDATE publication SET textField=? WHERE id=?', [req.body.textField, req.params.id], (err, result) => {
            if(err){
                console.log(error);
            } else {
                console.log(result);
            }
        })
    } else {
        const publication = {
            textField : req.body.textField,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        connectMysql.query('UPDATE publication SET textField=?, imageUrl=? WHERE id=?', [publication.textField, publication.imageUrl, req.params.id], (err, result) => {
            if(err){
                console.log(err);
            } else {
                console.log(result);
            }
        })
    }
};

module.exports.deletePublication = (req, res) => {
    connectMysql.query('SELECT * FROM publication WHERE id=?', [req.body.id], (err, result) => {
        if(err){
            res.status(400).json({error : "La publication n'existe pas"})
        } else {
            const publication = result[0];

            if(publication.imageUrl == undefined){
                connectMysql.query('DELETE FROM publication WHERE id=?', publication.id, (err, result) => {
                    if(err){
                        console.log(err);
                    } else {
                        res.status(200).json({message: 'Publication Supprimée'});
                    }
                })
            } else {
                const filename = publication.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {
                    connectMysql.query('DELETE FROM publication WHERE id=?', publication.id, (err, result) => {
                        if(err) {
                            res.status(400).json({error : "La publication n'existe pas"})
                        } else {
                            connectMysql.query('DELETE FROM comments WHERE publication_id=?', publication.id, (err, result) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log(result);
                                }
                                res.status(200).json({message: 'Publication Supprimée'});
                            })
                        }
                    })
                })
            }
        }
    })
};
