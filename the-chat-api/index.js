const express = require('express');
const routes = require('./routes/index.js');
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})
// const webpush = require('web-push');
require('dotenv').config()

// const publicVapidKey = process.env.THE_CHAT_PUBLIC_KEY_WEBPUSH;
// const privateVapidKey = process.env.THE_CHAT_PRIVATE_KEY;
// webpush.setVapidDetails('mailto: pedrolopeshls99@gmail.com', publicVapidKey, privateVapidKey)

app.use(bodyparser.json())

//Upload Files
app.use(fileUpload({
    useTempFiles: true
}));

cloudinary.config({
    cloud_name:process.env.THE_CHAT_CLOUDINARY_NAME,
    api_key:process.env.THE_CHAT_CLOUDINARY_API_KEY,
    api_secret:process.env.THE_CHAT_CLOUDINARY_API_SECRET
})

io.on('connection', socket => {

    let message = []
    socket.on('sendMessage', data => {
        message.push(data)
        socket.broadcast.emit('messageRecived', data)
    })
})

app.use(cors());

server.listen(port,"127.0.0.1");

app.use('/chat/api', routes);