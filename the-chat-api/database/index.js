const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log('process env ===> ', process.env.THE_CHAT_MONGO_URL)
mongoose.connect(process.env.THE_CHAT_MONGO_URL)
.then( (doc)=> { console.log("Conected with database")  })
.catch( (err) => { console.log(err) })

mongoose.Promise = global.Promise;
module.exports = mongoose;