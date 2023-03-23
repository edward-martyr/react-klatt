import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FormantName, FormantsState, OptionalFormantsState } from './types';

const initialState: FormantsState = {
  f1: 800,
  f2: 1200,
  f3: 2300,
};

export const formantsSlice = createSlice({
  name: 'formants',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<OptionalFormantsState>) => ({ ...state, ...action.payload }),
  },
});

export const { update } = formantsSlice.actions;
export const updateFormantByName = (name: FormantName, value: number) => (
  update({ [name]: value })
);

export const selectFormants = (state: RootState) => state.formants;
export const selectF1 = (state: RootState) => state.formants.f1;
export const selectF2 = (state: RootState) => state.formants.f2;
export const selectF3 = (state: RootState) => state.formants.f3;

export default formantsSlice.reducer;
