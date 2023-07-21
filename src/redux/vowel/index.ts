import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormantsState } from '../formants/types';
import { AppDispatch, RootState } from '../store';
import { Vowel, VowelState } from './types';

const initialState: VowelState = {
  vowel: null,
  loading: false,
};

export const vowelSlice = createSlice({
  name: 'vowel',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Vowel>) => (
      { ...state, vowel: action.payload }
    ),
    loading: (state, action: PayloadAction<boolean>) => (
      { ...state, loading: action.payload }
    ),
  },
});

export const { update, loading } = vowelSlice.actions;
export const updateVowelByFormants = (formants: FormantsState) => async (dispatch: AppDispatch) => {
  dispatch(loading(true));
  return fetch('https://klatt-api.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formants),
  })
    .then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        return Promise.reject();
      }
    })
    .then((data) => {
      const dataUrl = URL.createObjectURL(data);
      dispatch(update(dataUrl));
      dispatch(loading(false));
      return { success: true };
    })
    .catch(() => {
      dispatch(update(null));
      dispatch(loading(false));
      return { success: false };
    });
};

export const selectVowel = (state: RootState) => state.vowel.vowel;
export const selectLoading = (state: RootState) => state.vowel.loading;

export default vowelSlice.reducer;
