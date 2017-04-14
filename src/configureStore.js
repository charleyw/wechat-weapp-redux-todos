import {Redux, ReduxPersist, ReduxSaga, RemoteReduxDevTools} from './libs/index';
import reducer from './reducers/index';
import simpleRestClient from './rest/simple';
import crudFetch from './effects/crudFetch';

const {createStore, compose, applyMiddleware} = Redux;

function configureStore() {
  const devtool = RemoteReduxDevTools({hostname: 'localhost', port: 5678,secure: false});
  const sagaMiddleware = ReduxSaga.default();
  const store = createStore(
    reducer([{name: 'projects'}, {name: 'todos'}]),
    compose(applyMiddleware(sagaMiddleware), ReduxPersist.autoRehydrate(), devtool)
  );

  sagaMiddleware.run(crudFetch(simpleRestClient('http://localhost:3000')));

  return store;
}

module.exports = configureStore;
