//app.js
const {WeAppRedux: {Provider}} = require('./libs/index');
const {ReduxPersist} = require('./libs/index');
const configureStore = require('./configureStore.js');
import WeAppStorage from './libs/WeAppStorage';

const store = configureStore();
ReduxPersist.persistStore(store, {storage: WeAppStorage, debounce: 200});

App(Provider(store)({
  onLaunch: function () {
    console.log("onLaunch")
  }
}));