var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Sequelize = require('sequelize');
var passport = require('passport');
var strategy = require('./app/model/setup-passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express();
var PORT = process.env.PORT || 3020;
var staticContentFolder;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(cookieParser());
app.use(session({ secret: 'YOUR_SECRET_HERE', resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


staticContentFolder = __dirname + '/app/public';
app.use(express.static(staticContentFolder));


require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

app.listen(PORT,function(){
	console.log('Serving static content from ' + staticContentFolder)
	console.log('App listening on PORT: ' + PORT);
});


/*sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
 // console.log(jane.get({
    plain: true
  }));
}); */



