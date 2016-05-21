var passport = require('passport');
var users = [];
var geocoder = require('geocoder');
var rests = require('../db/RestaurantData.js');
var users = [];
module.exports = function(app){
	app.get('/user',
	  passport.authenticate('auth0', { failureRedirect: '/' }),
	  function(req, res) {
	    if (!req.user) {
	      throw new Error('user null');
	    }
	    res.redirect("/survey-request");
	  });
	
	
	app.get('/user-info', function (req, res) {
	  res.json(req.user)
	});

	app.get('/api/survey-request', function(req, res){
		var bool = true;
		for(var i=0; i<users.length; i++){
			if(users[i].id == req.user.id){
				req.user.survey = users[i].survey;
				bool = false;
				res.json(true);
			}
		}
		if(bool) res.json(false);
	});

	app.get('/api/restaurants', function(req, res){
		if(req.user.location == undefined){
			res.json(404);
		} else {
			var categories;
			if(req.user.survey.categories == undefined){
				categories = [" "];
			} else {
				categories = req.user.survey.categories;
			}
			
			var results = [];
			for(var i=0; i<rests.length; i++){
				if(rests[i].location != undefined && rests[i].location.coordinate != undefined && rests[i].location.coordinate.latitude != undefined){
					var loDif = Math.abs(req.user.location.longitude - rests[i].location.coordinate.longitude);
					var laDif = Math.abs(req.user.location.latitude - rests[i].location.coordinate.latitude);
					if(loDif < 0.08 && laDif < 0.08){
						results.push(rests[i]);
					}
				}
			};
			for(i=0; i<results.length; i++){
				results[i].rank = 0;
				for(var j=0; j<categories.length; j++){
					for(var k=0; k<results[i].categories.length; k++){
						if(categories[j].toLowerCase() == results[i].categories[k][1]) results[i].rank++;
					};
				};
			};
			var highest = 0;
			for(i=0; i<results.length; i++){
				if(results[i].rank > highest) highest = results[i].rank;
			};
			var finalResults = [];
			var bool = true;
			for(i = highest; i>=0; i--){
				for(j=0; j<results.length; j++){
					if(results[j].rank == i){
						finalResults.push(results[j]);
						if(finalResults.length == 10){
							bool = false;
							res.json(finalResults);
							return;
						}
					};
				};
			};
			if(bool) res.json(finalResults, null);
		};
	});


	app.post('/api/location', function(req, res){
		geocoder.reverseGeocode( req.body.latitude, req.body.longitude,  function ( err, data ) {
			if(err){
				res.json("Error: "+err);
				
			} else {
				req.user.location = {
					longitude: req.body.longitude,
					latitude: req.body.latitude
				};
				if(data.results[0] != undefined){
					req.user.location["address"] = data.results[0].formatted_address
				}
				res.json(req.user);
			};
		});
	});
	app.post('/api/survey', function(req, res){
		users.push({
			id: req.user.id,
			survey: req.body
		});
		res.end();
	});
};