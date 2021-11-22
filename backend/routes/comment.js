const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/', auth, commentControllers.createComment);
router.get('/', auth, commentControllers.getAllComments);
router.delete('/', auth, commentControllers.deleteComment);

module.exports = router;