const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');
const ChatController = require('../Controllers/ChatController');
const SubscribeController = require('../Controllers/SubscribeController');

const authMiddleware = require('../middlewares/auth');

// STATUS SERVER
router.get('/', (req, res) => {
    res.send('Server is runing for the chat app')
    console.log('Server ok')
});

router.route('/signup').post(UserController.create);
router.route('/login').post(UserController.login);

router.route('/forgot/pass').post(UserController.forgotPassword);
router.route('/confirm/recovery/code').post(UserController.confirmUserCode);

router.route('/update/user/password').patch(UserController.updateUserPassword);

router.route('/list/users').get(UserController.index);
// router.use(authMiddleware).route('/list/users').get(UserController.index);
router.use(authMiddleware).route('/update/user/:id').put(UserController.update);
router.use(authMiddleware).route('/user/:id').get(UserController.find);
router.use(authMiddleware).route('/update/user/image/:id').patch(UserController.updateImage);
router.use(authMiddleware).route('/upload/user/image').patch(UserController.upLoadUserImage);


// CREATE MESSAGE
router.use(authMiddleware).route('/create/chat').post(ChatController.create);

// SEND MESSAGE
router.use(authMiddleware).route('/send/message').put(ChatController.sendMessage);

// LIST CHATS
router.use(authMiddleware).route('/list/chats').get(ChatController.index);

// GET CHAT ID
router.use(authMiddleware).route('/chat/messages/:id').get(ChatController.listMessageChatbById);


// GET CHAT CONECTIONS BY USER ID
router.use(authMiddleware).route('/chats/userid/:id').get(ChatController.listChatConectionsByUserId);

// GET CHAT CONECTIONS BY USER ID
router.use(authMiddleware).route('/subscribe').post(SubscribeController.subscribewebpush);

// SEND NOTIFICATION
router.use(authMiddleware).route('/notification/send').post(SubscribeController.sendNotification);


module.exports = router;