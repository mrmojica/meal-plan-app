var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	day: { type: String, required: true },
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    dinner: { type: String, required: true },
    sideDish: { type: String, required: true },
    snack: { type: String, required: true },
    dessert: { type: String, required: true },
    calroies: { type: String, required: true }
}, { collection : 'Meal' });

var Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;