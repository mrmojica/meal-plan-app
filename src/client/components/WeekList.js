var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Input = require('./UserInput');
var MealDetail = require ('./MealDetail');
var Button = require('./Button');


var WeekList = React.createClass({


	componentWillMount: function() {
		this.props.dispatch(actions.fetchUser());
		this.props.dispatch(actions.fetchMeals());

	},

	renderData: function() {
		// console.log('userData', this.props.userData);
		console.log('weekday', this.props.weekday);
		return this.props.weekday.map(function(data, index) {
			// console.log('map function data', data);
			return <MealDetail key={index} data={data}/>
		});
	},

	render: function() {

	return (
		<div id="center">
		<table>
		<thead>
		 <tr>
				 <th scope="col" rowSpan="2">Day</th>
				 <th scope="col" colSpan="8">Meals</th>
		 </tr>

		 <tr>
				 <th scope="col">Breakfast</th>
				 <th scope="col">Lunch</th>
				 <th scope="col">Dinner</th>
				 <th scope="col">Side Dish</th>
				 <th scope="col">Snack</th>
				 <th scope="col">Dessert</th>
				<th scope="col">Calories</th>
		 </tr>
		</thead>
			 <tbody>

									{this.renderData()}
				</tbody>

	 		</table>
			<a href="/logout"><Button>Logout</Button></a>
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
	userData: state.userData,
	weekday: state.weekday
    };
};

var Container = connect(mapStateToProps)(WeekList);

module.exports = Container;
