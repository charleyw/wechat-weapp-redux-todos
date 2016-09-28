//index.js
const actions = require( '../../actions/index.js' )
const addTodo = actions.addTodo
const setVisibilityFilter = actions.setVisibilityFilter
const toggleTodo = actions.toggleTodo

//获取应用实例
var app = getApp()
var store = app.store

Page( {
  data: {
    todos: [],
    filters: [ { key: 'SHOW_ALL', text: '全部' }, { key: 'SHOW_ACTIVE', text: '正在进行' }, { key: 'SHOW_COMPLETED', text: '已完成' }]
  },
  addTodo: function( e ) {
    store.dispatch( addTodo( e.detail.value.todo ) )
  },
  handleCheck: function( e ) {
    const id = parseInt( e.target.id )
    store.dispatch( toggleTodo( id ) )
  },
  applyFilter: function( e ) {
    store.dispatch( setVisibilityFilter( e.target.id ) )
  },
  onLoad: function() {
    const state = store.getState();
    this.setData( {
      todos: filterTodos( state.todos, state.visibilityFilter ),
      visibilityFilter: state.visibilityFilter
    })

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.setData( {
        todos: filterTodos( state.todos, state.visibilityFilter ),
        visibilityFilter: state.visibilityFilter
      })
    })
  },
  onUnload: function() {
    this.unsubscribe()
  }
})

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
}