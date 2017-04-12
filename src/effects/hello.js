import {ReduxSaga, ReduxSagaEffects, regeneratorRuntime} from '../libs/index'

const {delay} = ReduxSaga;
const {takeEvery} = ReduxSagaEffects;

export function* helloAsync() {
  yield delay(1000);
  console.log('Hello Sagas!');
}

export function* watchAddTodo() {
  yield takeEvery('ADD_TODO', helloAsync)
}