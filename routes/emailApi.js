
const express = require('express');
const { sendEmail } = require('../controllers/email.controller');
const router = express.Router();

router.post('/sendEmail', sendEmail)



module.exports = router;