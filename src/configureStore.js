import {Redux, ReduxPersist, ReduxSaga} from './libs/index';
// const devtools = require('./libs/remote-redux-devtools.js').default;
import reducer from './reducers/index';
import simpleRestClient from './rest/simple';
import crudFetch from './effects/crudFetch';

const {createStore, compose, applyMiddleware} = Redux;

function configureStore() {
  const sagaMiddleware = ReduxSaga.default();
  const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), ReduxPersist.autoRehydrate()));
  sagaMiddleware.run(crudFetch(simpleRestClient('http://localhost:3000')));
  return store;
}

// function configureStore() {
//   const devtool = devtools({hostname: 'localhost', port: 5678,secure: false});
//   const sagaMiddleware = ReduxSaga.default();
//   const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), ReduxPersist.autoRehydrate(), devtool));
//
//   sagaMiddleware.run(crudFetch(simpleRestClient('http://localhost:3000')));
//
//   return store;
// }

module.exports = configureStore;
