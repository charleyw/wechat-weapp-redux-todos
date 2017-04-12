const {Redux: {combineReducers}} = require('../libs/index');
const todos = require('./todos.js');
const visibilityFilter = require('./visibilityFilter.js');

import auth from './auth'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  auth
});

module.exports = todoApp;