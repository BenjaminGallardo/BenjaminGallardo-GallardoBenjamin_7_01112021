const { connect } = require('../mysql-config');
const connectMysql = require('../mysql-config');

module.exports.createComment = (req, res) => {
    if(req.body.commentText == ''){
        res.status(500).json({error : "La publication ne peut pas être vide"})
    } else {
        connectMysql.query('INSERT INTO comments SET userId=?, commentText=?, publication_id=?', [req.body.userId, req.body.commentText, req.body.publication_id], (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.status(201).json({message: 'Commentaire créé'})
            }
        })
    }
};

module.exports.getAllComments = (req, res) => {
    connectMysql.query('SELECT * FROM comments', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json(result);
        }
    })
};

module.exports.deleteComment = (req, res) => {
};