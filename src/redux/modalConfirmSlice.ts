import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { ModalConfirmInterface } from '../interfaces/reduxInterface';

type ModalConfirmType = {
    modal: ModalConfirmInterface
}

const initialState:ModalConfirmType = {
    modal: {
        visible: false
    }
};

const slice = createSlice({
  name: 'modalConfirm',
  initialState,
  reducers: {
    setMenu:(state, action:PayloadAction<ModalConfirmInterface>) => {
        state.modal = action.payload
    },
    
  },
});

export const { setMenu } = slice.actions;
export default slice.reducer;
