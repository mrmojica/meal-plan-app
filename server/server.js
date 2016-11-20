var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var plan = require('./plan');
var config = require('../config');
var Meal = require('../model/mealSchema');
var googleConfig = require('./googleConfig');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../model/userSchema');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;


var jsonParser = bodyParser.json();
var app = express();


app.use('/', express.static('build'));

app.get('/public', function(req, res) {
    res.json({

        message: 'google strategy'

    });


});




//-----------------------Authentication Server-------------------------------------------



passport.use(new GoogleStrategy({
        clientID: googleConfig.googleAuth.clientID,
        clientSecret: googleConfig.googleAuth.clientSecret,
        callbackURL: googleConfig.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('ACCESSTOKEN******', accessToken);
        console.log('PROFILE*********', profile);
        // console.log('*_*_*_*_*_', user);

        User.findOne({
            'googleId': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                var newUser = {
                    googleId: profile.id,
                    accessToken: accessToken,
                    displayName: profile.displayName,
                    name: profile.name.givenName + " " + profile.name.familyName,
                };

                User.create(newUser, function(err, user) {
                    if (err || !newUser) {
                        console.error("Could not create user", newUser.name);
                        return done(err, user);
                    }
                    console.log("Created user", newUser.name);
                    return done(err, user);
                });

            } else {

                return done(err, user);
            }
        });

    }));



app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    function(req, res) {
        res.cookie('accessToken', req.user.accessToken, {
            expires: 0
        });
        res.redirect('/#/mealPlan');
    });

passport.use(new BearerStrategy(
    function(token, done) {
        console.log('token', token);
        User.find({
            accesToken: token
        }, function(err, users) {
            if (err) {
                return done(err)
            }
            if (!users) {
                console.log('no user found');
                return done(null, false)
            }
            console.log('found user');
            return done(null, users, {
                scope: 'read'
            });
        });
    }
));


app.get('/user',
    passport.authenticate('bearer', {
        session: false
    }),
    function(req, res) {
        User.find(function(err, meal) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });

            }
            res.json(meal);
        });
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



app.put('/api/mealPlan/:id', jsonParser, function(req, res) {
    var id = req.params.id;
    console.log('id params', id);
    var newHistory = req.body.mealHistory;
    console.log('newHistory', newHistory);
    User.findOneAndUpdate({
            "googleId": id,
            "plan.id": newHistory[1]
        }, {
            "$set": {
                "plan.$.breakfast": newHistory[3],
                "plan.$.lunch": newHistory[4],
                "plan.$.dinner": newHistory[5],
                "plan.$.sideDish": newHistory[6],
                "plan.$.snack": newHistory[7],
                "plan.$.dessert": newHistory[8],
                "plan.$.calories": newHistory[9]
            }
        },{
            new: true
        },
        function(err, mealPlan) {
            if (err) {
                console.log('Could not update data!');
            }

            console.log('mealPlan', mealPlan.plan);
              if (!req.params.id) {
        return res.sendStatus(404);
    }

    res.status(200).json(mealPlan.plan);

        });



  
    // console.log(storage.items);

});



var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};
mongoose.Promise = global.Promise;
if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};


app.get('/api/mealPlan', function(req, res) {
    User.find(function(err, plan) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(plan);
    });
});

app.post('/api/mealplan', jsonParser, function(req, res) {



});




exports.app = app;
exports.runServer = runServer;

