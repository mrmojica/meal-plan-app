var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;


var Input = React.createClass({
	componentDidMount: function() {
	// this.props.dispatch(actions.fetchUser());
	// this.props.dispatch(actions.fetchWords());
},

	render: function() {
		return(
			<div>
				<form onSubmit=''>
					<ul>
						<li> Day: <input ref='day' /> </li>
						<li> Breakfast: <input ref='breakfast' /> </li>
						<li> Lunch: <input ref='lunch' /> </li>
						<li> Dinner: <input ref='dinner' /> </li>
						<li> Side Dish: <input ref='sideDish' /> </li>
						<li> Snack: <input ref='snack' /> </li>
						<li> Dessert: <input ref='dessert' /> </li>
						<li> Total Calories: <input ref='calories' /> </li>
					</ul>
					<button type='submit'>Add Plan</button>
				</form>
			</div>
			);
	}
});

var mapStateToProps = function(state, props) {
    return {
    
    };
};

var Container = connect(mapStateToProps)(Input);

module.exports = Input;
