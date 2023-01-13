const express = require('express')
const app = express();
const port = process.env.PORT || 3001
const cors = require('cors')
const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload')
// const cloudinary = require('cloudinary')
// const keys = require('../src/config/keys')

app.use(cors())

// app.use(fileUpload({
//     useTempFiles: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cloudinary.config({
//     cloud_name:keys.cloudinary_name,
//     api_key: keys.cloudinary_API_Key,
//     api_secret: keys.cloudinary_API_Secret
// })

app.listen(port, console.log('Listen port 3333'));


app.use('/api', require('./routes/index'))