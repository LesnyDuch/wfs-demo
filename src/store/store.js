/**
 * Store definition
 */
import { applyMiddleware,  createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import requestReducer from './reducer'


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(requestReducer, composedEnhancer)

export default store;