//index.js
import {showProjectForm, hideProjectForm, showTodoForm, hideTodoForm} from '../../actions/pages/projects';
import {addProject, addTodo, fetchProjects} from '../../actions/index';
import {enhancedConnect} from '../../utils/enhancedConnect';

const pageConfig = {
  data: {
    projectForm: {
      name: ''
    },
    todoForm: {
      isShowProjectSelect: false,
      name: ''
    }
  },
  handleInputProjectName: function (e) {
    this.setData({projectForm: {name: e.detail.value}})
  },
  submitProject: function () {
    if (this.data.projectForm.name.length <= 0) return;

    this.addProject(this.data.projectForm.name);
    this.setData({projectForm: {name: ''}})
  },
  handleInputTodoName: function (e) {
    this.setData({todoForm: {...this.data.todoForm, name: e.detail.value}})
  },
  submitTodo: function () {
    if (this.data.todoForm.name.length > 0) {
      this.addTodo(this.data.todoForm.projectId || this.data.projects.list.ids[0], this.data.todoForm.name);
      this.setData({todoForm: {name: ''}})
    } else {
      this.hideTodoForm();
    }
  },
  showProjectSelect: function() {
    this.setData({todoForm: {...this.data.todoForm, isShowProjectSelect: true}, isTodoNameFocused: false})
  },
  selectProject: function(e) {
    this.setData({todoForm: {...this.data.todoForm, projectId: e.target.id, isShowProjectSelect: false}, isTodoNameFocused: true})
  },
  onAuthenticated: function() {
    this.fetchProjects();
  },
  showProjectForm: function() {
    this.store.dispatch(showProjectForm());
    setTimeout(() => this.setData({isProjectNameFocused: true}), 400)
  },
  hideProjectForm: function() {
    this.store.dispatch(hideProjectForm());
    this.setData({isProjectNameFocused: false});
  },
  showTodoForm: function() {
    this.store.dispatch(showTodoForm());
    setTimeout(() => this.setData({isTodoNameFocused: true}), 400)
  },
  hideTodoForm: function() {
    this.store.dispatch(hideTodoForm());
    this.setData({isTodoNameFocused: false});
  }
};

const mapStateToData = state => ({
  isShowProjectForm: state.pages.projects.showProjectForm,
  isShowTodoForm: state.pages.projects.showTodoForm,
  projects: state.projects,
  notification: state.notification
});

const mapDispatchToPage = dispatch => ({
  addTodo: (projectId, name) => dispatch(addTodo(projectId, name)),
  addProject: (name) => dispatch(addProject(name)),
  fetchProjects: () => dispatch(fetchProjects())
});

const nextPageConfig = enhancedConnect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);