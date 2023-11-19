import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { reduxInterface } from '../interfaces/reduxInterface';

const initialState:reduxInterface = {
    menu: 'Dashboard',
};

const slice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu:(state, action:PayloadAction<string>) => {
        state.menu = action.payload
    }
  },
});

export const { setMenu } = slice.actions;
export default slice.reducer;
