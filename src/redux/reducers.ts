// reducers.ts
import { combineReducers } from 'redux';
import menuReducer from './menuSlice';

const rootReducer = combineReducers({
  menu: menuReducer,
  // Tambahkan reducer lain di sini jika ada
});

export default rootReducer;