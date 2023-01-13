const express = require('express');
const router = express.Router();

const UserController = require('../the-chat-api/Controllers/UserController');
const ChatController = require('../the-chat-api/Controllers/ChatController');
const SubscribeController = require('../the-chat-api/Controllers/SubscribeController');

const authMiddleware = require('../the-chat-api/middlewares/auth');

// STATUS SERVER
router.get('/the-chat', (req, res) => {
    res.send('Server is runing public-service')
    console.log('Server ok')
});

router.route('/the-chat/signup').post(UserController.create);
router.route('/the-chat/login').post(UserController.login);

router.route('/the-chat/forgot/pass').post(UserController.forgotPassword);
router.route('/the-chat/confirm/recovery/code').post(UserController.confirmUserCode);

router.route('/the-chat/update/user/password').patch(UserController.updateUserPassword);

router.route('/the-chat/list/users').get(UserController.index);
// router.use(authMiddleware).route('/list/users').get(UserController.index);
router.use(authMiddleware).route('/the-chat/update/user/:id').put(UserController.update);
router.use(authMiddleware).route('/the-chat/user/:id').get(UserController.find);
router.use(authMiddleware).route('/the-chat/update/user/image/:id').patch(UserController.updateImage);
router.use(authMiddleware).route('/the-chat/upload/user/image').patch(UserController.upLoadUserImage);


// CREATE MESSAGE
router.use(authMiddleware).route('/the-chat/create/chat').post(ChatController.create);

// SEND MESSAGE
router.use(authMiddleware).route('/the-chat/send/message').put(ChatController.sendMessage);

// LIST CHATS
router.use(authMiddleware).route('/the-chat/list/chats').get(ChatController.index);

// GET CHAT ID
router.use(authMiddleware).route('/the-chat/chat/messages/:id').get(ChatController.listMessageChatbById);


// GET CHAT CONECTIONS BY USER ID
router.use(authMiddleware).route('/the-chat/chats/userid/:id').get(ChatController.listChatConectionsByUserId);

// GET CHAT CONECTIONS BY USER ID
router.use(authMiddleware).route('/the-chat/subscribe').post(SubscribeController.subscribewebpush);

// SEND NOTIFICATION
router.use(authMiddleware).route('/the-chat/notification/send').post(SubscribeController.sendNotification);


module.exports = router;