//index.js
const {WeAppRedux: {connect}} = require( '../../libs/index' )
const {addTodo, setVisibilityFilter, toggleTodo} = require( '../../actions/index.js' )

const pageConfig = {
  data: {
    todos: [],
    filters: [ { key: 'SHOW_ALL', text: '全部' }, { key: 'SHOW_ACTIVE', text: '正在进行' }, { key: 'SHOW_COMPLETED', text: '已完成' }],
    defaultInput: ''
  },
  handleCheck: function( e ) {
    const id = parseInt( e.target.id )
    this.toggleTodo( id );
  },
  applyFilter: function( e ) {
    this.setVisibilityFilter( e.target.id )
  },
  handleInputTodo: function(e) {
    this.setData({todo: e.detail.value})
  },
  submit: function() {
    if(this.data.todo.length <= 0) return;

    this.addTodo(this.data.todo);
    this.setData({todo: ''})
  },
  switchCompleted: function() {
    this.setData({showCompleted: !this.data.showCompleted});
  },
  onLoad: function() {
    console.log('on load')
  },
  onUnload: function() {
    console.log('on unload')
  }
}

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

const mapStateToData = state => ({
  todos: filterTodos( state.todos, 'SHOW_ACTIVE' ),
  completedTodos: filterTodos( state.todos, 'SHOW_COMPLETED' ),
  visibilityFilter: state.visibilityFilter
})

const mapDispatchToPage = dispatch => ({
  setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
  toggleTodo: id => dispatch(toggleTodo(id)),
  addTodo: todo => dispatch(addTodo(todo)),
})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);