//  Environment Variables
require('dotenv').config()
//  require express and middleware
let express = require('express')
let app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('./crons/first-cron');
const {verifyToken} = require('./controllers/auth.Controller');





// connect to database
require('./database/connect');

//EJS TEMPLATE
app.set('view engine', 'ejs');
app.set('views',path.join('views'))


// Get request
app.get('/',verifyToken,  (req, res)=>{
     res.status(200).render('index')
}); 

// use middleware
app.use(bodyParser.json());
app.use(cors());

// initialize routes
app.use('/api',require('./routes/api'));
app.use('/api',require('./routes/userApi'));
app.use('/api',require('./routes/emailApi'));
app.use('/api', require('./routes/uploadApi'));
app.use('/api',require('./routes/auth'))
// listen for requests
app.listen(process.env.port || 4000,()=>{
    console.log('listen for request');
})

