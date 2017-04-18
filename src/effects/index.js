import {ReduxSagaEffects, regeneratorRuntime, appConfig} from '../libs/index'
import simpleRestClient from '../rest/simple';

import crudFetch from './crudFetch'
import {watchAddTodo} from './projectTodoCount'
import {watchFetchLoading} from './navBarLoading'
import {watchShowNotification} from './hideNotification'

import failure from './failure'

const {fork} = ReduxSagaEffects;

export default function* root() {
  yield [
    fork(crudFetch(simpleRestClient(appConfig.apiBaseUrl), ()=> [], failure)),
    fork(watchAddTodo),
    fork(watchFetchLoading),
    fork(watchShowNotification)
  ]
}