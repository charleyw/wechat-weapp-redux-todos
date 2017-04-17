import WeAppRedux from 'wechat-weapp-redux';
import * as Redux from 'redux';
import * as ReduxPersist from 'redux-persist';
import * as ReduxSaga from 'redux-saga';
import * as ReduxSagaEffects from 'redux-saga/effects';
import regeneratorRuntime from 'regenerator-runtime/runtime';

import appConfig from './appConfig';

let RemoteReduxDevTools = f => f => f;

if (process.env.NODE_ENV !== 'production') {
  RemoteReduxDevTools = require('./remote-redux-devtools').default;
}

export {Redux, WeAppRedux, ReduxPersist, ReduxSaga, ReduxSagaEffects, regeneratorRuntime, RemoteReduxDevTools, appConfig};
