var React = require('react');
var ReactDOM = require('react-dom');
var WeekList = require('./WeekList');
// var Input = require('./UserInput');


var Main = function(){

	return (
		<div id="main">
			<h1>My Meal Plan</h1> 
			<WeekList />
		</div>

		)




};


module.exports = Main;