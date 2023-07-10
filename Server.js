const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require("ejs");
const connectDB = require('./server/database/connection');


dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080

//morgen 
const app = express();
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//load assets
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/assets/img'));
app.use(express.static(__dirname + '/assets/js'));


//load routes
app.use('/', require('./server/routes/router'));


app.listen(PORT, () => {
    console.log(`my server listening on http://localhost:${PORT}`);
});