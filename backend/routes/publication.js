const express = require('express');
const router = express.Router();
const publicationControllers = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, publicationControllers.getAllPublication);
router.get('/:id', auth, publicationControllers.getOnePublication);
router.post('/', auth, multer, publicationControllers.createPublication);
router.put('/:id', auth, multer, publicationControllers.modifyPublication);
router.delete('/', auth, publicationControllers.deletePublication);

module.exports = router;