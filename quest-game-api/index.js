const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3001

app.use(bodyParser.json());
app.use(cors())

app.listen(port,"127.0.0.1");

// Routes
app.use('/game/api', require('./routes/index'))