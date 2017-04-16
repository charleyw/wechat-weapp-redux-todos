//index.js
import {WeAppRedux} from '../../libs/index';
import {showProjectForm, hideProjectForm, showTodoForm, hideTodoForm} from '../../actions/pages/projects';
import {addProject, addTodo} from '../../actions/index';

const {connect} = WeAppRedux;

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
    this.setData({todoForm: {...this.data.todoForm, isShowProjectSelect: true}})
  },
  selectProject: function(e) {
    this.setData({todoForm: {...this.data.todoForm, projectId: e.target.id, isShowProjectSelect: false}})
  }
};

const mapStateToData = state => ({
  isShowProjectForm: state.pages.projects.showProjectForm,
  isShowTodoForm: state.pages.projects.showTodoForm,
  projects: state.projects
});

const mapDispatchToPage = dispatch => ({
  showProjectForm: () => dispatch(showProjectForm()),
  hideProjectForm: () => dispatch(hideProjectForm()),
  showTodoForm: () => dispatch(showTodoForm()),
  hideTodoForm: () => dispatch(hideTodoForm()),
  addTodo: (projectId, name) => dispatch(addTodo(projectId, name)),
  addProject: (name) => dispatch(addProject(name))
});

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);