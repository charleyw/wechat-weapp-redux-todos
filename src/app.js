//app.js
const {WeAppRedux: {Provider}, ReduxPersist} = require('./libs/index');
const configureStore = require('./configureStore.js');
import WeAppStorage from './utils/WeAppStorage';
import {login} from './actions/auth';

const store = configureStore();

const tryToLogin = (err, state) => {
  if (!state.auth || !state.auth.authenticated || state.auth.expiredAt <= new Date().getTime()) {
    wx.login({
      success: function (res) {
        if (res.code) {
          store.dispatch(login(res.code));
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
};

ReduxPersist.persistStore(store, {storage: WeAppStorage, debounce: 200, whitelist: ['auth', 'projects']}, tryToLogin);

App(Provider(store)({
  onLaunch: function () {
    console.log("onLaunch")
  }
}));