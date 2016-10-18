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
   //  var lunch = this.refs.lunchRef.value;
   //  this.props.dispatch(actions.updateData(this.props.data.id, this.props.data.day, this.props.data.breakfast, lunch));
  	// this.props.dispatch(actions.fetchMeals());
  },

	render: function() {

	return (
		<div>
			<div>
				<h3>{this.props.data.day}</h3>
				<form>
				<ul>
					<li> Breakfast: <ContentEditable value={this.props.data.breakfast} disabled={false} onChange={this.handleBlur} /> </li>
					<li> Lunch: <input type='text' ref='lunchRef' onChange={this.onChange} value={this.props.data.lunch} /> </li>
					<li> Dinner: {this.props.data.dinner}</li>
					<li> Side Dish: {this.props.data.sideDish}</li>
					<li> Snack: {this.props.data.snack} </li>
					<li> Dessert: {this.props.data.dessert} </li>
					<li> Total Calories: {this.props.data.calories} </li>
				</ul>
				</form>
			</div>	
		</div>

		)
 
	}

});

var mapStateToProps = function(state, props) {
    return {

    };
};

var Container = connect(mapStateToProps)(MealDetail);

module.exports = Container;