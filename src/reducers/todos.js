import { Redux } from '../libs/index';
import data from './resource/data';
import ids from './resource/list/ids';

const list = (state = {}, action) => {
  if (!action.meta || action.meta.resource !== 'todos') return state;

  const projectTodoIds = ids('todos')(state[action.meta.projectId] || [], action);
  return {...state, [action.meta.projectId]: projectTodoIds}
};


export default Redux.combineReducers({
  data: data('todos'),
  list: list,
});
