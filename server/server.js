var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var plan = require('./plan');
var config = require('../config');
var Meal = require('../model/mealSchema');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../model/userSchema');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;


var jsonParser = bodyParser.json();
var app = express();


app.use('/', express.static('build'));

app.get('/public', function(req, res) {
	res.json({

		message:'google strategy'

	});


});




//-----------------------Authentication Server-------------------------------------------



passport.use(new GoogleStrategy({
    clientID: '494705858866-nqkdasdjshg31l83id03a0qjako2ljmo.apps.googleusercontent.com',
    clientSecret: 'n-o-KWZT2NExUghcc6k--mvH',
    callbackURL: "http://localhost:8080/auth/google/callback"
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
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                var newUser = {
            googleId: profile.id,
            accessToken: accessToken,
            displayName: profile.displayName,
            name: profile.name.givenName + " " + profile.name.familyName,
          // quizHistory: [{
          //   id: 0,
          //   wrongAmt: 0
          // }]
                };

                User.create(newUser, function(err, user) {
    if (err || !newUser) {
        console.error("Could not create user", newUser.name);
        return done(err, user);
    }
    console.log("Created user", newUser.name);
    return done(err, user);
});
                // user.save(function(err) {
                //     if (err) console.log(err);
                //     return done(err, user);
                // });
            } else {
                //found user. Return + UPDATEwww

                return done(err, user);
            }
  });

// return cb(null, user);
  }));

  // var user = {
  //  googleId: profile.id,
  //  accessToken: accessToken,
  //  displayName: profile.displayName,
  //  name: profile.name
   // };

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('accessToken', req.user.accessToken, {expires:0});
    res.redirect('/#/mealPlan');
  });

// accessToken: ya29.Ci9zA3DQVNgXLBa-z59TOPMH5KohT1LCsARqxQ7Un65KwDL1uEsbVfr4nEUATjOYCA

// passport.use(new BearerStrategy(
//   function(token, done) {
//    console.log('token', token);
//    //we need the token to equal the accessToken
//    if(token == 'ya29.Ci9zA3DQVNgXLBa-z59TOPMH5KohT1LCsARqxQ7Un65KwDL1uEsbVfr4nEUATjOYCA') {
//      var user = {user:'bob'};
//      return done(null, user, {scope: 'read'});
//    } else {
//      return done(null, false);
//    }
//   }
// ));


passport.use(new BearerStrategy(
  function(token, done) {
    console.log('token', token);
    User.find({ accesToken: token}, function(err, users) {
      if(err) {
        return done(err)
      }
      if(!users) {
        console.log('no user found');
        return done(null, false)
      }
      console.log('found user');
      return done(null, users, {scope: 'read'});
    });
}
));



//need?
app.get('/user',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
      User.find(function(err, meal){
    if (err) {
      return res.status(500).json({
        message:'Internal Server Error'
      });

    }
    res.json(meal);
  });
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});














//-----------------------General Server-------------------------------------------


//this code inserts the plan data to the mongodb (comment out so it wont duplicate the plan data)
// User.collection.insert(plan, function(error) {

//  if (error || null) {
//  //     return res.status(500).json({
//  //       message:'Internal Server Error'
//   return 'Internal Error';
//  //     });
//    }

// });


// Update
app.put('/api/mealPlan/:id', jsonParser, function(req, res) {

    // return the index of the object

    var id = req.params.id;
    console.log('id params', id);
		var newHistory = req.body.mealHistory;
    console.log('newHistory', newHistory);
    User.update(
    	{"googleId": id,
        "plan.id": newHistory[1]},
    	{
        "$set":
        {"plan.$.breakfast": newHistory[3],
      "plan.$.lunch": newHistory[4],
      "plan.$.dinner": newHistory[5],
      "plan.$.sideDish": newHistory[6],
      "plan.$.snack": newHistory[7],
      "plan.$.dessert": newHistory[8],
      "plan.$.calories": newHistory[9]}
    },
			// quizSession: newSession},
    	function(err, doc){
    		if(err) {
    			console.log('Could not update data!');
    		}
    		// console.log(doc);

    });



    if (!req.params.id) {
        return res.sendStatus(404);
    }

    res.status(200).json("Success");
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


// db.collection.insert()
//this inserts the database (word.js) we created to our mongodb.
// Word.collection.insert(words, function(error) {
//
// 	if (error || null) {
// 			return res.status(500).json({
// 				message:'Internal Server Error'
// 			});
// 		}
//
// });

// db.words.dropDatabase();


//To clear database run the code below.
// Word.collection.remove();





app.get('/api/mealPlan' , function(req, res) {
	User.find(function(err, plan){
		if (err) {
			return res.status(500).json({
				message:'Internal Server Error'
			});
		}
		res.json(plan);
	});
});

app.post('/api/mealplan' , jsonParser, function(req, res) {



});




exports.app = app;
exports.runServer = runServer;


// app.listen(8080, function () {
//   console.log('Listening at 8080!');
// });
