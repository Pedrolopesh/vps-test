const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3002

app.use(bodyParser.json());
app.use(cors())

app.listen(port, console.log(`sever started at: http://localhost:${port}/api/`));

// Routes
app.use('/api', require('./routes/index'))