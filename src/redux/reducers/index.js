import { combineReducers } from 'redux';
import { itemsHasErrored } from './error';
import { wallets } from './wallets';

export default combineReducers({
    wallets,
    itemsHasErrored
});
