const express = require('express');
const router = express.Router();

const theChatRoutes = require('./the-chat-routes');
const publicServiceRoutes = require('./public-services');
const questGameRoutes = require('./quest-game-api');

router.use(theChatRoutes)
router.use(publicServiceRoutes)
router.use(questGameRoutes)

module.exports = router;