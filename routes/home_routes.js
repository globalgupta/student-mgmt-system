const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
const homeController = require('../controllers/home_controllers');
const validateToken = require('../middleware/jwt-validator');



router.post('/login', homeController.login);   //no middileware


module.exports = router;