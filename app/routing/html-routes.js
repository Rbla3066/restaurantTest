// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');

var requiresLogin = require('./requiresLogin.js');
// Routes
// =============================================================
module.exports = function(app) {
    // if asked will send survey page
    app.get('/location', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/location.html'));
    });
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/restaurant.html'));
    });
    app.get('/main', requiresLogin, function(req, res)	{
    	res.sendFile(path.join(__dirname + '/../public/main-page.html'));
    });

    // if other send index page
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

};
