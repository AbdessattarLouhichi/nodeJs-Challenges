const express = require('express');
const router = express.Router();
const { register} = require('../controllers/auth.Controller');
const {login} = require('../controllers/auth.Controller')


router.post('/register',register);
router.post('/login',login)



module.exports = router