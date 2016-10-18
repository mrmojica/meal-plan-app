var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;


var Landing = function(){

	return (
		<div id="landing">
			<div id="landing-header"><h1>Personal Meal Planner</h1></div>
		
			<button><a href="/auth/google">Register/Login</a></button>
		</div>

		)

};


module.exports = Landing;