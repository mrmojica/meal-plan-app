var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');



var MealDetail = React.createClass({




	componentWillMount: function() {
		this.props.dispatch(actions.fetchMeals());

	},

	render: function() {

	return (
		<div>
			<div>
				<h3>{this.props.day}</h3>
				<ul>
					<li> Breakfast: {this.props.breakfast} </li>
					<li> Lunch: {this.props.lunch} </li>
					<li> Dinner: {this.props.dinner}</li>
					<li> Side Dish: {this.props.sideDish}</li>
					<li> Snack: {this.props.snack} </li>
					<li> Dessert: {this.props.dessert} </li>
					<li> Total Calories: {this.props.calories} </li>
				</ul>
			</div>	
		</div>

		)
 
	}

});

var mapStateToProps = function(state, props) {
    return {
    id: state.id,
    day: state.day,
	breakfast: state.breakfast,
	lunch: state.lunch,
	dinner: state.dinner,
	sideDish: state.sideDish,
	snack: state.snack,
	dessert: state.dessert,
	calories: state.calories
    };
};

var Container = connect(mapStateToProps)(MealDetail);

module.exports = Container;