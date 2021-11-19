const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/', commentControllers.createComment);
router.get('/', commentControllers.getAllComments);
router.delete('/:id', commentControllers.deleteComment);

module.exports = router;