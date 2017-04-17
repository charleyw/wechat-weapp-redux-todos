import {ReduxSagaEffects, regeneratorRuntime} from '../libs/index';
import {
  FETCH_START,
  FETCH_END,
  FETCH_ERROR,
  FETCH_CANCEL,
} from '../actions/fetchActions';

const {takeEvery, takeLatest, put, call, cancelled, select} = ReduxSagaEffects;

const crudFetch = (restClient, successSideEffects = () => [], failureSideEffects = () => []) => {
  function *handleFetch(action) {
    const {type, payload, meta} = action;
    const restType = meta.fetch;
    delete meta.fetch;
    yield [
      put({type: `${type}_LOADING`, payload, meta}),
      put({type: FETCH_START}),
    ];
    let response;
    try {
      const auth = yield select(state => state.auth);
      response = yield call(restClient, restType, meta.resource, payload, auth);
      yield [
        put({
          type: `${type}_SUCCESS`,
          payload: response,
          requestPayload: payload,
          meta,
        }),
        ...successSideEffects(type, meta.resource, payload, response).map(a => put(a)),
        put({type: FETCH_END}),
      ];
    } catch (error) {
      yield [
        put({
          type: `${type}_FAILURE`,
          error: error.message ? error.message : error,
          requestPayload: payload,
          meta,
        }),
        ...failureSideEffects(type, meta.resource, payload, error).map(a => put(a)),
        put({type: FETCH_ERROR}),
      ];
    } finally {
      if (yield cancelled()) {
        yield put({type: FETCH_CANCEL});
        return; /* eslint no-unsafe-finally:0 */
      }
    }
  }

  return function *watchCrudFetch() {
    yield [
      takeLatest(action => action.meta && action.meta.fetch && action.meta.cancelPrevious, handleFetch),
      takeEvery(action => action.meta && action.meta.fetch && !action.meta.cancelPrevious, handleFetch),
    ];
  };
};


export default crudFetch;
