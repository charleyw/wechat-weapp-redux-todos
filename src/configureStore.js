import {Redux, ReduxPersist, ReduxSaga, RemoteReduxDevTools} from './libs/index';
import reducer from './reducers/index';
import rootEffect from './effects/index';

const {createStore, compose, applyMiddleware} = Redux;

function configureStore() {
  const devtool = RemoteReduxDevTools({hostname: 'localhost', port: 5678,secure: false});
  const sagaMiddleware = ReduxSaga.default();
  const store = createStore(
    reducer([{name: 'projects'}, {name: 'todos'}]),
    compose(applyMiddleware(sagaMiddleware), ReduxPersist.autoRehydrate(), devtool)
  );

  sagaMiddleware.run(rootEffect);

  return store;
}

module.exports = configureStore;
