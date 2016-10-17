var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('../config');
// var Word = require('../models/wordSchema');
// var User = require('../models/userSchema');



var jsonParser = bodyParser.json();
var app = express();


app.use('/', express.static('build'));

app.get('/public', function(req, res) {
	res.json({

		message:'google strategy'

	});


});


//Update
// app.put('/user/:id', jsonParser, function(req, res) {

//     // return the index of the object
//     var id = req.params.id;
// 		var newHistory = req.body.quizHistory;
// 		var newSession = spacedAlgo(newHistory);
//     User.findOneAndUpdate(
//     	{_id: id },
//     	{quizHistory: newHistory,
// 			quizSession: newSession},
//     	function(err, doc){
//     		if(err) {
//     			console.log('Could not update data!');
//     		}
//     		console.log(doc);

//     });



//     if (!req.params.id) {
//         return res.sendStatus(404);
//     }

//     res.status(200).json("Success");
//     // console.log(storage.items);

// });

  //   res.json(req.user);
  // });


// var runServer = function(callback) {
//     mongoose.connect(config.DATABASE_URL, function(err) {
//         if (err && callback) {
//             return callback(err);
//         }

//         app.listen(config.PORT, function() {
//             console.log('Listening on localhost:' + config.PORT);
//             if (callback) {
//                 callback();
//             }
//         });
//     });
// };
// mongoose.Promise = global.Promise;
// if (require.main === module) {
//     runServer(function(err) {
//         if (err) {
//             console.error(err);
//         }
//     });
// };


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





app.get('/api/mealplan' , function(req, res) {
	// Word.find(function(err, words){
	// 	if (err) {
	// 		return res.status(500).json({
	// 			message:'Internal Server Error'
	// 		});
	// 	}
	// 	res.json(words);
	// });
});

app.post('/api/mealplan' , jsonParser, function(req, res) {



});










exports.app = app;
// exports.runServer = runServer;


app.listen(8080, function () {
  console.log('Listening at 8080!');
});