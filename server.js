require('dotenv').config();
const express = require('express');
const path = require('path');
const {logger} = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose'); 
const conn = require('./config/dbConn');
const PORT = process.env.port || 3500 ;


conn();
app.set('view engines', 'ejs')
// custom middleware
app.use( logger);

// middleware for cookies
app.use(credentials)
// cross origin resource sharing 
app.use(cors(corsOptions));

// middleware for form 
app.use(express.urlencoded({ extended : false}));

// middleware for json
app.use(express.json());

// middleware for cookie
app.use(cookieParser());
// middleware for static files
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.get('/', (req, res) => {
   res.render('index.ejs');
})

app.all('*', (req, res) => {
 res.status(404);
 if (req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
 }else if (req.accepts('json')){
    res.json({"error": "not found "});
 }else{
    res.type('txt').send('404 not found');
 }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  app.listen(PORT, () => console.log(`server is running on ${PORT}`));
})

