const express = require('express');
const router = express.Router();
const profileControllers = require('../controllers/profile');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, profileControllers.getProfile);
router.put('/email', auth, profileControllers.modifyEmail);
router.put('/password',auth, profileControllers.modifyPassword);
router.put('/bio',auth, profileControllers.modifyBio);
router.put('/profile-image',auth, profileControllers.modifyProfileImage);
router.delete('/', auth, multer,profileControllers.deleteAccount);

module.exports = router;