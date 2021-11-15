const express = require('express');
const router = express.Router();
const publicationControllers = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', publicationControllers.getAllPublication);
router.get('/:id', publicationControllers.getOnePublication);
router.post('/', multer, publicationControllers.createPublication);
router.put('/:id', multer, publicationControllers.modifyPublication);
router.delete('/', publicationControllers.deletePublication);

module.exports = router;