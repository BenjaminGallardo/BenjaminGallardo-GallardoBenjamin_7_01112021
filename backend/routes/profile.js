const express = require('express');
const router = express.Router();
const profileControllers = require('../controllers/profile');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', profileControllers.getProfile);
router.put('/email', profileControllers.modifyEmail);
router.put('/password', profileControllers.modifyPassword);
router.put('/bio', profileControllers.modifyBio);
router.put('/profile-image', profileControllers.modifyProfileImage);
router.delete('/', profileControllers.deleteAccount);

module.exports = router;