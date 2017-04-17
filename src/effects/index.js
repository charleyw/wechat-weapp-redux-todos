import {ReduxSagaEffects, regeneratorRuntime, appConfig} from '../libs/index'
import simpleRestClient from '../rest/simple';

import crudFetch from './crudFetch'
import {watchAddTodo} from './projectTodoCount'

const {fork} = ReduxSagaEffects;

export default function* root() {
  yield [
    fork(crudFetch(simpleRestClient(appConfig.apiBaseUrl))),
    fork(watchAddTodo)
  ]
}