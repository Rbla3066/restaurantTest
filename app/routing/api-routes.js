var passport = require('passport');
var users = [];
var geocoder = require('geocoder');
var rests = require('../db/RestaurantData.js');
module.exports = function(app){
	app.get('/user',
	  passport.authenticate('auth0', { failureRedirect: '/' }),
	  function(req, res) {
	    if (!req.user) {
	      throw new Error('user null');
	    }
	    res.redirect("/location");
	  });
	
	
	app.get('/restaurants', function (req, res) {
	  res.json(req.user)
	});
	app.post('/api/location', function(req, res){
		geocoder.reverseGeocode( req.body.latitude, req.body.longitude,  function ( err, data ) {
			console.log(data);
		req.user.location = {
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			address: data.results[0].formatted_address
		};
		res.json(req.user);

		});
	});
	app.post('/api/restaurants', function(req, res){
		console.log(req.body.latitude)
		var results = [];
		for(var i=0; i<rests.length; i++){
			if(rests[i].location != undefined && rests[i].location.coordinate != undefined && rests[i].location.coordinate.latitude != undefined){
				var loDif = Math.abs(req.body.longitude - rests[i].location.coordinate.longitude);
				var laDif = Math.abs(req.body.latitude - rests[i].location.coordinate.latitude);
				if(loDif < 0.06 && laDif < 0.06){
					results.push(rests[i]);
				}
			}
			if(results.length == 20) res.json(results);
		}
		res.json(results);
	})
};