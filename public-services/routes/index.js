const express = require('express')
const router = express.Router()
const EmailController = require('../controllers/emailController')

router.get('/', (req, res) => {
    res.send('Server is runing')
    console.log('Server ok')
});

router.route('/send/email').post(EmailController.send)

module.exports = router