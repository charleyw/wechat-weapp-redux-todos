import {SHOW_NOTIFICATION, hideNotification} from '../actions/notificationActions'
import {ReduxSaga, ReduxSagaEffects, regeneratorRuntime} from '../libs/index'

const {delay} = ReduxSaga;
const {takeLatest, put} = ReduxSagaEffects;

function* tryHideNotification() {
  yield delay(1500);
  yield put(hideNotification());
}

export function* watchShowNotification() {
  yield takeLatest(SHOW_NOTIFICATION, tryHideNotification);
}