var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;
var Button = require('./Button');


var Landing = function(){

	return (
		<div id="landing">
			<div id="landing-header"><h1>Personal Meal Planner</h1></div>

		<a href="/auth/google"><Button>Click here to login with Google!</Button></a>
		</div>

		)

};


module.exports = Landing;
