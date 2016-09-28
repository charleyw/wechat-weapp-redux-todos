var combineReducers = Redux.combineReducers
var todos = require('./todos.js')
var visibilityFilter = require('./visibilityFilter.js')

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

module.exports = todoApp