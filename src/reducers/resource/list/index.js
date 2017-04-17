import { Redux } from '../../../libs/index';
import ids from './ids';

export default (resource) => Redux.combineReducers({
    ids: ids(resource)
});
