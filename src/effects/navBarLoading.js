import {FETCH_START, FETCH_END, FETCH_ERROR} from '../actions/fetchActions'
import {ReduxSagaEffects, regeneratorRuntime} from '../libs/index'

const {takeEvery} = ReduxSagaEffects;

function* showLoading() {
  wx.showNavigationBarLoading();
}

function* hideLoading() {
  wx.hideNavigationBarLoading()
}

export function* watchFetchLoading() {
  yield [
    takeEvery(FETCH_START, showLoading),
    takeEvery(FETCH_END, hideLoading),
    takeEvery(FETCH_ERROR, hideLoading)
  ];
}