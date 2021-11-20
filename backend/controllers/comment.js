const connectMysql = require('../mysql-config');

module.exports.createComment = (req, res) => {
    var date = new Date();
    var options = { year: "numeric", month: "long", day: "2-digit"};
    const dateComment = `${date.toLocaleDateString("fr-FR", options)} à ${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`

    if(req.body.commentText == ''){
        res.status(500).json({error : "La publication ne peut pas être vide"})
    } else {
        connectMysql.query('INSERT INTO comments SET userId=?, commentText=?, publication_id=?, date=?', [req.body.userId, req.body.commentText, req.body.publication_id, dateComment], (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.status(201).json({message: 'Commentaire créé'})
            }
        })
    }
};

module.exports.getAllComments = (req, res) => {
    connectMysql.query('SELECT * FROM comments ORDER BY id DESC', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json(result);
        }
    })
};

module.exports.deleteComment = (req, res) => {
};