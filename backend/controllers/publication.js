const connectMysql = require('../mysql-config');
const fs = require('fs');
const { connect } = require('../mysql-config');

module.exports.getAllPublication = (req, res) => {
    connectMysql.query('SELECT *, publication.id FROM publication, user WHERE publication.userId = user.id ORDER by date DESC', (err, result) => {
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
        userId: req.body.userId,
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
        const imageUrlPublication = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        connectMysql.query('INSERT INTO publication SET userId=?, textField=?, imageUrlPublication=?, date=?', [newPublication.userId, newPublication.textField, imageUrlPublication, newPublication.date],(err, result) => {
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

    connectMysql.query('SELECT * FROM publication WHERE id=?', [req.params.id], (err, result) => {
        if(err){
            console.log("Cette publication n'existe pas");
        } else {
            if(result[0].userId != req.body.userId){
                console.log("Vous n'êtes pas autoriser à modifier cette publication");
            } else {
                if(req.file === undefined){
                    connectMysql.query('UPDATE publication SET textField=?, date=? WHERE id=?', [req.body.textField, datePublication, req.params.id], (err, result) => {
                        if(err){
                            console.log(error);
                        } else {
                            res.status(200).json(result);
                        }
                    })
                } else {
                    const filename = result[0].imageUrlPublication.split('/images/')[1]
                    fs.unlink(`images/${filename}`, () => {
                        const publication = {
                            textField : req.body.textField,
                            imageUrlPublication: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        }
    
                        connectMysql.query('UPDATE publication SET textField=?, imageUrlPublication=?, date=? WHERE id=?', [publication.textField, publication.imageUrlPublication, datePublication, req.params.id], (err, result) => {
                            if(err){
                                console.log(err);
                            } else {
                                res.status(200).json(result);
                            }
                        })
                    })
                }
            }
        }
    })
};

module.exports.deletePublication = (req, res) => {
    connectMysql.query('SELECT publication.id, publication.userId FROM publication WHERE id=?', [req.body.id], (err, result) => {
        if(err){
            res.status(400).json({error : "La publication n'existe pas"})
        } else {
            const publication = result[0];

            if(publication.userId != req.body.userId){
                console.log("Vous n'êtes pas autoriser à supprimer cette publication");
            } else { 
                connectMysql.query('DELETE FROM comments WHERE publication_id=?', [req.body.id], (err, result) => {
                    if(err){
                        console.log(err);
                    } else {
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
            }
        }
    })
};
