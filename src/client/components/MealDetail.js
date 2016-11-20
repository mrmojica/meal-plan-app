var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');


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

    this.props.dispatch(actions.updateData(this.props.userId, this.props.data.id, this.props.data.day, breakfast, lunch, dinner, sideDish, snack, dessert, calories));
  	// this.props.dispatch(actions.fetchMeals());
  },

	render: function() {

	return (
				<tr>
						<th scope="row">{this.props.data.day}</th>
						<td> <input type='text' ref='breakfastRef' onChange={this.onChange} value={this.props.data.breakfast} /></td>
						<td> <input type='text' ref='lunchRef' onChange={this.onChange} value={this.props.data.lunch} /> </td>
						<td><input type='text' ref='dinnerRef' onChange={this.onChange} value={this.props.data.dinner} /></td>
						<td><input type='text' ref='sideDishRef' onChange={this.onChange} value={this.props.data.sideDish} /></td>
						<td><input type='text' ref='snackRef' onChange={this.onChange} value={this.props.data.snack} /></td>
						<td><input type='text' ref='dessertRef' onChange={this.onChange} value={this.props.data.dessert} /></td>
						<td><input type='value' ref='caloriesRef' onChange={this.onChange} value={this.props.data.calories} /></td>
						</tr>

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
