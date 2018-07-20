import { combineReducers } from 'redux';
import { itemsHasErrored, itemsFirstLoading } from './items';
import { items } from './wallet';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsFirstLoading
});
