'use strict';
//const appReg = require('./app');
const express = require('express');
const app = express();
var flash    = require('connect-flash');
const appFCCCities = require('./appFCCCities');

////const fbcrawler = require('./app/data_collection/fb_crawler');
app.use(express.static('public'));
app.set('view engine', 'ejs'); // set up ejs for templating
// set up our express application
//app.use(express.logger('dev')); // log every request to the console
//app.use(express.cookieParser()); // read cookies (needed for auth)
//app.use(express.bodyParser()); // get information from html forms
//app.use(flash()); // use connect-flash for flash messages stored in session

// required for passport
app.use(appFCCCities.registersession); // session secret
app.use(appFCCCities.authfbpassport.initialize());
app.use(appFCCCities.authfbpassport.session()); // persistent login sessions


// routes ======================================================================
//require('./appFCCCities/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use('/', appFCCCities.router);


////appReg();
////fbcrawler.fbcrawler


app.listen(8080);
console.log('Listening on port 8080');