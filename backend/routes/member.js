const express = require('express');
const router = express.Router();
const memberControllers = require('../controllers/member');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, memberControllers.getAllMembers);
router.get('/:id', auth, memberControllers.getOneMember);

module.exports = router;