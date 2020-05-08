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
//import swagger ui
const swagger = require('swagger-ui-express');
//import open Api documentation
const openApi = require('./openapi/openApi');

// configure bodyparser to handle post request
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
//make public uplad folder

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(path.join(__dirname, '/public')));
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

// run app to listen to specified port
app.listen(port,()=> console.log(`Server running on port:${port}`));

























// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'myproject';

// // Create a new MongoClient
// const client = new MongoClient(url, { useNewUrlParser:  true, useUnifiedTopology: true });

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   insertDocuments(db, function() {
//     client.close();
//   });
// });

// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//       {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       test(collection);
//     });
//   }
  
// function test(result){
// }