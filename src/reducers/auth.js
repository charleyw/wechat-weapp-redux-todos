import {CRUD_CREATE_SUCCESS} from '../actions/dataActions'

const auth = (state = {authenticated: false}, action) => {
  if(action.meta && action.meta.resource !== 'auth') return state;

  switch (action.type) {
    case CRUD_CREATE_SUCCESS:
      return {authenticated: true, ...action.payload};
    default:
      return state
  }
};

export default auth;