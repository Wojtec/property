// dotenv config
require('dotenv').config();
//import express
const express = require('express');
// initialise app
const app = express();
//path
const path = require('path');
//setup port
const port = process.env.PORT || 3000;
//import bodyparser
const bodyParser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');
// import url db config
const dbUrl = require('./config/dbconfig');
//import user routes
const userRoutes = require('./routing/user');
//import home routes
const homeRoutes = require('./routing/home');
//import office routes
const officeRoutes = require('./routing/office');
//import message routes
const messageRoutes = require('./routing/message');
//import swagger ui
const swagger = require('swagger-ui-express');
//import open Api documentation
const openApi = require('./openapi/openApi');
//import Cors
const cors = require('cors');

// use Cors
app.use(cors());

// configure bodyparser to handle post request
app.use(bodyParser.urlencoded({
  extended: true
}));

// use bodyParser
app.use(bodyParser.json());

//make public uplad folder
process.env.PWD = process.cwd();
app.use('/proxy',express.static(path.join(process.env.PWD, 'public')));

//connection to Mongoose and set connection variable
mongoose.connect(dbUrl.url,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true,
   family: 4
  });
let db = mongoose.connection;
// check if db is connected
if(!db){
  console.log("Error connection to database");
}else{
  console.log("Connected successfully to server MongoDB");
}

//swagger route
app.use('/open',swagger.serve, swagger.setup(openApi));

//route for user
app.use('/user',userRoutes);

//route for home table
app.use('/home',homeRoutes);

//route for office table
app.use('/office',officeRoutes);

//route for home table
app.use('/',homeRoutes);

//route for message table
app.use('/message',messageRoutes);

// run app to listen to specified port
app.listen(port,()=> console.log(`Server running on port:${port}`));

