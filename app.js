const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose'); //DB
const keys = require('./config/keys');

const app = express();

const users = require('./routes/users');

//Models
Item = require('./models/item_model');;
User = require('./models/user_model');

//Connect to Mongoose,
mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.on('connected',()=>{
    console.log('connected to database '+keys.mongodb.dbURI)
})
mongoose.connection.on('error',(err)=>{
    console.log('Database error: '+err)
})

// Set the headers	
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
// Headers. Or: app.use(cors()) //

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))
//Body Parser Middleware
app.use(bodyParser.json())

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Please use /api/products or /api/users')
})
//Products Route
app.get('/api/products',(req,res)=>{
    console.log('geted product from db');
    Item.getItems((err,items)=>{
        if(err){
            throw err
        }
        res.json(items)
        console.log(items[0])
    })
})
//Users Route
app.get('/api/users',(req,res)=>{
    console.log('geted users from data')
    User.getUserByUsername((err,users)=>{
        if(err){
            throw err
        }
        res.json(users)
        console.log(users)
    })
})

//Start Server
const port = 4000;
app.listen(port, function () {
    console.log('Server started on port ' + port)
})