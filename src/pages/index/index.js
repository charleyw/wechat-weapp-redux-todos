//index.js
import {WeAppRedux} from '../../libs/index';
import {showProjectForm, hideProjectForm} from '../../actions/pages/projects';
import {addProject} from '../../actions/index';

const {connect} = WeAppRedux;

const pageConfig = {
  data: {
    projectForm: {
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
  }
};

const mapStateToData = state => ({
  isShowProjectForm: state.pages.projects.showProjectForm,
  projects: state.projects
});

const mapDispatchToPage = dispatch => ({
  showProjectForm: () => dispatch(showProjectForm()),
  hideProjectForm: () => dispatch(hideProjectForm()),
  addProject: (name) => dispatch(addProject(name))
});

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);