const express = require('express');
const router = express.Router();
const publicationControllers = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', publicationControllers.getAllPublication);
router.post('/', multer, publicationControllers.createPublication);
router.put('/:id', publicationControllers.modifyPublication);
router.delete('/:id', publicationControllers.deletePublication);

module.exports = router;