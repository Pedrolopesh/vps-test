const express = require('express');
const router = express.Router();

const theChatRoutes = require('./the-chat-routes');
const publicServiceRoutes = require('./public-services');

router.use(theChatRoutes)
router.use(publicServiceRoutes)

module.exports = router;