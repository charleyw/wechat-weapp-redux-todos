const {Redux: {combineReducers}} = require('../libs/index');

import auth from './auth'
import resourceReducer from './resource/index'

export default (resources) => {
  const resourceReducers = {};
  resources.forEach(resource => {
    resourceReducers[resource.name] = resourceReducer(resource.name, resource.options);
  });

  return combineReducers({
    ...resourceReducers,
    auth,
  });
};
