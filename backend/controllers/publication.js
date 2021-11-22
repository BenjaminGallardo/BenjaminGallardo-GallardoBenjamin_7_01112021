const connectMysql = require('../mysql-config');
const fs = require('fs');
const { connect } = require('../mysql-config');

module.exports.getAllPublication = (req, res) => {
    connectMysql.query('SELECT * FROM publication ORDER BY date DESC', (err, result) => {
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
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "2-digit"};

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
                res.status(200).json(result);
            }
        })
    } else {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        connectMysql.query('INSERT INTO publication SET userId=?, textField=?, imageUrl=?, date=?', [newPublication.userId, newPublication.textField, imageUrl, newPublication.date],(err, result) => {
            if(err){
                console.log(err);
            } else {
                res.status(200).json(result);
            }
        })
    }
};

module.exports.modifyPublication = (req, res) => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "2-digit"};
    const datePublication = `${date.toLocaleDateString("fr-FR", options)} à ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`;

    if(req.file === undefined){
        connectMysql.query('UPDATE publication SET textField=?, date=? WHERE id=?', [req.body.textField, datePublication, req.params.id], (err, result) => {
            if(err){
                console.log(error);
            } else {
                res.status(200).json(result);
            }
        })
    } else {
        const publication = {
            textField : req.body.textField,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }

        connectMysql.query('UPDATE publication SET textField=?, imageUrl=?, date=? WHERE id=?', [publication.textField, publication.imageUrl, datePublication, req.params.id], (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.status(200).json(result);
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
