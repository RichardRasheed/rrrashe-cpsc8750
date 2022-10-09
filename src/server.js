// use the express library
const express = require('express');

// use the cookie parser
const cookieParser = require('cookie-parser');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// adding the cookie parser to the app
app.use(cookieParser());


//This is the folder where we will store public files, notably css
app.use(express.static('public'));



//set up for cookies
let nextVisitorId = 1;
nextVisitorId += 1;

//use lastVisit with cookies to calculate time of last visit
let currentTime = Date.now().toString();

app.get('/', (req, res) => {
  res.cookie('visitorId', nextVisitorId);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', {
    name: req.query.name || "Richard",
    date: new Date().toLocaleString(),
    timeofLastVisit: Math.floor((Date.now().toString() - req.cookies.visited) /1000),
    whoIsVisitor: req.cookies.visitorId,

  });
  console.log(req.cookies);
});

// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");