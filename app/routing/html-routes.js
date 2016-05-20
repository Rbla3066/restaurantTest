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
    app.get('/location', requiresLogin, function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/location.html'));
    });
    app.get('/survey-request', requiresLogin, function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/surveyRequest.html'));
    });
    app.get('/survey', requiresLogin, function(req, res) {
        if(req.user.survey != undefined){
            res.sendFile(path.join(__dirname + '/../public/surveyRequest.html'));
        } else {
            res.sendFile(path.join(__dirname + '/../public/survey.html'));
        }
    });

    app.get('/main', requiresLogin, function(req, res)	{
    	if(req.user.survey != undefined && req.user.location != undefined){
            res.sendFile(path.join(__dirname + '/../public/main-page.html'));
        } else if(req.user.survey != undefined){
            res.redirect('/location');
        } else {
            res.redirect('/survey');
        }
    });

    // if other send index page
    app.use(function(req, res) {
        console.log(req.user);
        if(req.user.survey != undefined){
            res.sendFile(path.join(__dirname + '/../public/surveyRequest.html'));
        } else {
            res.sendFile(path.join(__dirname + '/../public/index.html'));
        }
    });

};
