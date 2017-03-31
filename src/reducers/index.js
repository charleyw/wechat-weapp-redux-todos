const {Redux: {combineReducers}} = require('../libs/index');
const todos = require('./todos.js');
const visibilityFilter = require('./visibilityFilter.js');

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

module.exports = todoApp;