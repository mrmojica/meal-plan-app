var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Input = require('./UserInput');
var MealDetail = require ('./MealDetail');


var WeekList = React.createClass({




	componentWillMount: function() {
		this.props.dispatch(actions.fetchMeals());

	},

	renderData: function() {
		return this.props.weekday.map(function(data, index) {
			console.log('map function data', data);
			return <MealDetail />
		});
	},

	render: function() {

	return (
		<div>
			{this.renderData()}
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
	calories: state.calories,
	weekday: state.weekday
    };
};

var Container = connect(mapStateToProps)(WeekList);

module.exports = Container;