var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'rbla3066.auth0.com',
    clientID:     'dCLsz1hEmVYS3KFLS9pUT2LeVFitNRhO',
    clientSecret: '7aYE3BvRnRHqjq9SYhA6BiVaHAnV5rr4FPVcKxpVajMpky5IBq7X0PmOHsQo8BBY',
    callbackURL:  'https://experiod.herokuapp.com/user'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = strategy;
