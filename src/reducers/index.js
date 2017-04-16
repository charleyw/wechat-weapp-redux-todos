const {Redux: {combineReducers}} = require('../libs/index');

import auth from './auth'
import resourceReducer from './resource/index'
import pages from './pages/index'
import todos from './todos'
import rehydrated from './rehydrated'

export default (resources) => {
  const resourceReducers = {};
  resources.forEach(resource => {
    resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
  });

  return combineReducers({
    ...resourceReducers,
    todos,
    auth,
    pages,
    rehydrated
  });
};
