var React = require('react');
var ReactDOM = require('react-dom');
var WeekList = require('./WeekList');
var Input = require('./UserInput');


var Main = function(){

	return (
		<div id="main">
			<Input/>
			<WeekList />
		</div>

		)




};


module.exports = Main;