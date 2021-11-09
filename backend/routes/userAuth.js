const express = require('express');
const router = express.Router();
const userAuthControllers = require('../controllers/userAuth');

router.post('/subscribe', userAuthControllers.subscribe);
router.post('/connexion', userAuthControllers.connexion);


module.exports = router;