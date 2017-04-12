import {Redux, ReduxPersist, ReduxSaga} from './libs/index';
// const devTools = require('./libs/remote-redux-devtools.js').default;
import reducer from './reducers/index';
import {watchAddTodo} from './effects/hello';

const {createStore, compose, applyMiddleware} = Redux;

function configureStore() {
  const sagaMiddleware = ReduxSaga.default();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware), compose(ReduxPersist.autoRehydrate()));
  sagaMiddleware.run(watchAddTodo);
  return store;
}
// function configureStore() {
//   return createStore(reducer, compose(autoRehydrate(), devTools({
//     hostname: 'localhost',
//     port: 5678,
//     secure: false
//   })));
// }

module.exports = configureStore;
