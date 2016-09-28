//index.js
//获取应用实例
var app = getApp()
var todos = [
      {id: 0, text: '看小程序文档', completed: false},
      {id: 1, text: '看小程序设计指南', completed: false},
      {id: 2, text: '写小程序版本的Todo', completed: false},
      {id: 3, text: '使用Redux', completed: false}
    ];

Page({
  data: {
    todos: todos 
  },
  addTodo: function (e) {
    todos.push({id: todos.length, text: e.detail.value.todo, completed: false});
    this.setData({todos})
  },
  handleCheck: function (e) {
    const id = e.target.id
    this.setData({todos: this.data.todos.map(t => {
      if (t.id.toString() !== id){
        return t
      }

      return Object.assign({}, t, {completed: !t.completed})
    })})
  }
})
