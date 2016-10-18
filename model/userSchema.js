var mongoose = require('mongoose');
var Plan = require('../server/plan');

// var planHistory = [{
// id: 0,
// wrongAmt: 0
// },{
// id: 1,
// wrongAmt: 0
// },{
// id: 2,
// wrongAmt: 0
// },{
// id: 3,
// wrongAmt: 0
// },{
// id: 4,
// wrongAmt: 0
// },{
// id: 5,
// wrongAmt: 0
// },{
// id: 6,
// wrongAmt: 0
// },{
// id: 7,
// wrongAmt: 0
// },{
// id: 8,
// wrongAmt: 0
// },{
// id: 9,
// wrongAmt: 0
// }]

var UserSchema = new mongoose.Schema({
	googleId: { type: Number, index: true },
	accessToken: { type: String, required: true },
	displayName: { type: String, required: true },
	name: { type: String, required: true },
	plan: {type: Array, default: Plan}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;