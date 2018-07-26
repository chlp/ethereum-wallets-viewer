import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import { save, load } from "redux-localstorage-simple"

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        //load(),
        initialState,
        applyMiddleware(thunk, save(), loggerMiddleware)
    );
}
