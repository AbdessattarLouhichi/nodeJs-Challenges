//  require express and middleware
let express = require('express')
let app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


// connect to database
require('./database/connect');


// Get request
app.get('/', (req, res)=>{
     res.send('Hello World !')
}); 

// use middleware
app.use(bodyParser.json());
app.use(cors());

// initialize routes
app.use('/api',require('./routes/api'))
app.use('/api',require('./routes/userApi'))
// listen for requests
app.listen(process.env.port || 4000,()=>{
    console.log('listen for request');
})

