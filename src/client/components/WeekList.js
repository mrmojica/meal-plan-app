var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var Input = require('./UserInput');


var WeekList = React.createClass({


	render: function() {
	return (
		<div>
			<div>
				<h3></h3>
				<ul>
					<li> Breakfast: </li>
					<li> Lunch: </li>
					<li> Dinner: </li>
					<li> Side Dish: </li>
					<li> Snack: </li>
					<li> Dessert:  </li>
					<li> Total Calories: </li>
				</ul>
			</div>	
		</div>

		)
 
	}

});

var mapStateToProps = function(state, props) {
    return {
    
    };
};

var Container = connect(mapStateToProps)(WeekList);

module.exports = WeekList;