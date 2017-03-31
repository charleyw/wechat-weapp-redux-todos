//app.js
const {WeAppRedux: {Provider}} = require('./libs/index');
const configureStore = require('./configureStore.js');

App(Provider(configureStore())({
  onLaunch: function () {
    console.log("onLaunch")
  }
}));