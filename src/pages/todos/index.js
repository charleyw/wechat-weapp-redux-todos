//index.js
import {enhancedConnect} from '../../utils/enhancedConnect';
import {addTodo, fetchTodos, updateTodo} from '../../actions/index';
const {setVisibilityFilter, toggleTodo} = require( '../../actions/index.js' );

const pageConfig = {
  data: {
    filters: [ { key: 'SHOW_ALL', text: '全部' }, { key: 'SHOW_ACTIVE', text: '正在进行' }, { key: 'SHOW_COMPLETED', text: '已完成' }],
    defaultInput: ''
  },
  handleCheck: function( e ) {
    const todo = this.data.todos[e.target.id];
    if(todo) {
      this.updateTodo(todo.id, {completed: !todo.completed})
    }
  },
  applyFilter: function( e ) {
    this.setVisibilityFilter( e.target.id )
  },
  handleInputTodo: function(e) {
    this.setData({todo: e.detail.value})
  },
  submit: function() {
    if(this.data.todo.length <= 0) return;

    this.addTodo(this.projectId, this.data.todo);
    this.setData({todo: ''})
  },
  switchCompleted: function() {
    this.setData({showCompleted: !this.data.showCompleted});
  },
  onLoad: function(options) {
    this.projectId = options.projectId;
    wx.setNavigationBarTitle({title: this.data.project.name});
  },
  onAuthenticated: function(options) {
    this.fetchTodos(options.projectId);
  }
};

const filterTodos = ( todos, filter ) => {
  switch( filter ) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed )
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed )
    default:
      throw new Error( 'Unknown filter: ' + filter )
  }
};

const mapStateToData = (state, options) => {
  const todos = (state.todos.list[options.projectId] || []).map(id => state.todos.data[id]).filter(f => f);
  return {
    project: state.projects.data[options.projectId],
    todos: state.todos.data,
    activeTodos: filterTodos(todos, 'SHOW_ACTIVE'),
    completedTodos: filterTodos(todos, 'SHOW_COMPLETED'),
    visibilityFilter: state.visibilityFilter,
    notification: state.notification
  }
};

const mapDispatchToPage = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  updateTodo: (id, data) => dispatch(updateTodo(id, data)),
  addTodo: (projectId, todo) => dispatch(addTodo(projectId, todo)),
  fetchTodos: (projectId) => dispatch(fetchTodos(projectId)),
});

const nextPageConfig = enhancedConnect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);