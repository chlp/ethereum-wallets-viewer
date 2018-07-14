import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsFirstLoading } from './items';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsFirstLoading
});
