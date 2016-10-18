var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
// var PlainEditable = require('react-plain-editable');
// var InlineEdit = require('react-edit-inline');
var ContentEditable = require('react-contenteditable');



var MealDetail = React.createClass({




	componentWillMount: function() {
		this.props.dispatch(actions.fetchMeals());

	},

  onChange: function() {
  	var breakfast = this.refs.breakfastRef.value;
    var lunch = this.refs.lunchRef.value;
    var dinner = this.refs.dinnerRef.value;
    var sideDish = this.refs.sideDishRef.value;
    var snack = this.refs.snackRef.value;
    var dessert = this.refs.dessertRef.value;
    var calories = this.refs.caloriesRef.value;

    // console.log('breakfast', breakfast);
    // console.log('lunch', lunch);
    // console.log('dinner', dinner);
    // console.log('sideDish', sideDish);
    // console.log('snack', snack);
    // console.log('dessert', dessert);
    // console.log('calories', calories);
    // console.log('userId', this.props.userId);

    this.props.dispatch(actions.updateData(this.props.userId, this.props.data.id, this.props.data.day, breakfast, lunch, dinner, sideDish, snack, dessert, calories));
  	this.props.dispatch(actions.fetchMeals());
  },

	render: function() {
//alternate text edit option instead of using input (ref does not work)
// <ContentEditable value={this.props.data.breakfast} disabled={false} onChange={this.handleBlur} />

	return (
		<div>
			<div>
				<h3>{this.props.data.day}</h3>
				<form>
				<ul>
					<li> Breakfast: <input type='text' ref='breakfastRef' onChange={this.onChange} value={this.props.data.breakfast} /> </li>
					<li> Lunch: <input type='text' ref='lunchRef' onChange={this.onChange} value={this.props.data.lunch} /> </li>
					<li> Dinner: <input type='text' ref='dinnerRef' onChange={this.onChange} value={this.props.data.dinner} /> </li>
					<li> Side Dish: <input type='text' ref='sideDishRef' onChange={this.onChange} value={this.props.data.sideDish} /> </li>
					<li> Snack: <input type='text' ref='snackRef' onChange={this.onChange} value={this.props.data.snack} /> </li>
					<li> Dessert: <input type='text' ref='dessertRef' onChange={this.onChange} value={this.props.data.dessert} /> </li>
					<li> Total Calories: <input type='value' ref='caloriesRef' onChange={this.onChange} value={this.props.data.calories} /> </li>
				</ul>
				</form>
			</div>	
		</div>

		)
 
	}

});

var mapStateToProps = function(state, props) {
    return {
    	userId: state.userId,
    	weekday: state.weekday
    };
};

var Container = connect(mapStateToProps)(MealDetail);

module.exports = Container;