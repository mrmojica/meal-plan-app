var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var plan = require('./plan');
var config = require('../config');
var Meal = require('../model/mealSchema');



var jsonParser = bodyParser.json();
var app = express();


app.use('/', express.static('build'));

app.get('/public', function(req, res) {
	res.json({

		message:'google strategy'

	});


});

//this code inserts the plan data to the mongodb (comment out so it wont duplicate the plan data)
// Meal.collection.insert(plan, function(error) {

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
		var newHistory = req.body.mealHistory;
    console.log('newHistory', newHistory);
    Meal.findOneAndUpdate(
    	{id: id },
    	{breakfast: newHistory[2],
      lunch: newHistory[3],
      dinner: newHistory[4],
      sideDish: newHistory[5],
      snack: newHistory[6],
      dessert: newHistory[7],
      calories: newHistory[8]
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
	Meal.find(function(err, plan){
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