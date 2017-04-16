import {CRUD_CREATE_SUCCESS} from '../../actions/dataActions';
import {
  SHOW_PROJECT_FORM, 
  HIDE_PROJECT_FORM,
  SHOW_TODO_FORM,
  HIDE_TODO_FORM
} from '../../actions/pages/projects';

const projectsPage = (state = {showProjectForm: false, showTodoForm: false}, action) => {
  switch (action.type) {
    case SHOW_PROJECT_FORM:
      return {...state, showProjectForm: true};
    case HIDE_PROJECT_FORM:
      return {...state, showProjectForm: false};
    case SHOW_TODO_FORM:
      return {...state, showTodoForm: true};
    case HIDE_TODO_FORM:
      return {...state, showTodoForm: false};
    case CRUD_CREATE_SUCCESS:
      if (action.meta && action.meta.resource == 'projects') {
        return {...state, showProjectForm: false};
      } else if (action.meta && action.meta.resource == 'todos') {
        return {...state, showTodoForm: false};
      } else {
        return state;
      }
    default:
      return state
  }
};

export default projectsPage;