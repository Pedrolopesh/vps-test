const express = require('express')
const router = express.Router()
const EmailController = require('../publisc-service/controllers/emailController')

router.get('/public-service', (req, res) => {
    res.send('Server is runing public-service')
    console.log('Server ok')
});

router.route('/public-service/send/email').post(EmailController.send)

module.exports = router