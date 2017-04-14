import {crudCreate} from './dataActions'

const addTodo = (projectId, name) => (crudCreate('todos', {name}, `projects/${projectId}/todos`));

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

module.exports = {
    addTodo: addTodo,
    setVisibilityFilter: setVisibilityFilter,
    toggleTodo: toggleTodo
}