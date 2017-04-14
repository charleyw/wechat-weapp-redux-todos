import { Redux } from '../../../libs/index';
import ids from './ids';
import total from './total';

export default (resource) => Redux.combineReducers({
    ids: ids(resource),
    total: total(resource),
});
