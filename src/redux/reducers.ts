// reducers.ts
import { combineReducers } from 'redux';
import menuReducer from './menuSlice';
import userReducer from './userSlice'

const rootReducer = combineReducers({
    menu: menuReducer,
    userReducer
});

export default rootReducer;