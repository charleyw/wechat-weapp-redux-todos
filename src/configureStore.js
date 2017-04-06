const {Redux: {createStore, compose}, ReduxPersist: {autoRehydrate}} = require('./libs/index');
// const devTools = require('./libs/remote-redux-devtools.js').default;
const reducer = require('./reducers/index.js');

function configureStore() {
  return createStore(reducer, undefined, compose(autoRehydrate()));
}
// function configureStore() {
//   return createStore(reducer, compose(autoRehydrate(), devTools({
//     hostname: 'localhost',
//     port: 5678,
//     secure: false
//   })));
// }

module.exports = configureStore;
