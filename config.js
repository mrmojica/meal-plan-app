exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV = 'mongodb://meal-plan:meal-plan123@ds157667.mlab.com:57667/meal-planner');
exports.PORT = process.env.PORT || 8080;