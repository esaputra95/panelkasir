// reducers.ts
import { combineReducers } from 'redux';
import menuReducer from './menuSlice';

const rootReducer = combineReducers({
    menu: menuReducer
});

export default rootReducer;