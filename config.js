exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV = 'mongodb://meal-plan:mealplan123@ds157667.mlab.com:57667/meal-planner);
exports.PORT = 8080 || process.env.PORT;