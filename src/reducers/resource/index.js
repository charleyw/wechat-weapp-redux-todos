import { Redux } from '../../libs/index';
import data from './data';
import list from './list/index';

export default (resource) => Redux.combineReducers({
    data: data(resource),
    list: list(resource),
});
