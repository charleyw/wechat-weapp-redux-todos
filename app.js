//app.js
const Redux = require('./libs/redux.js')
const createStore = Redux.createStore
const reducer = require('./reducers/index.js')
const store = createStore(reducer)
const WeAppRedux = require('./libs/wechat-weapp-redux/index.js');
const {Provider} = WeAppRedux;

App(Provider(store)({
  onLaunch: function () {
    console.log("onLaunch")
  }
}))