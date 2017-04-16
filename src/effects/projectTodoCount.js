import {CRUD_CREATE_SUCCESS, CRUD_UPDATE_SUCCESS} from '../actions/dataActions'
import {ReduxSagaEffects, regeneratorRuntime} from '../libs/index'

const {put, takeEvery, select} = ReduxSagaEffects;

function* updateTodoCount(action) {
  const {meta: {projectId}} = action;
  const project = yield select(state => state.projects.data[projectId]);
  if (project) {
    yield put({
      type: CRUD_UPDATE_SUCCESS,
      payload: {...project, todosCount: (project.todosCount || 0) + 1},
      meta: {resource: 'projects'}
    })
  }
}

export function* watchAddTodo() {
  yield takeEvery(action => action.meta && action.meta.resource == 'todos' && action.type === CRUD_CREATE_SUCCESS, updateTodoCount)
}