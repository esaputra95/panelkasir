import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserReduxInterface } from '../interfaces/reduxInterface';

const initialState:UserReduxInterface = {
    name: '',
    level: '',
    username: '',
    storeId: ''
};

const slice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserSlice:(state, action:PayloadAction<UserReduxInterface>) => {
            return {...state, ...action.payload}
        }
    },
});

export const { setUserSlice } = slice.actions;
export default slice.reducer;
