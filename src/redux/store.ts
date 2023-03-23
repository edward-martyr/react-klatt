import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import formantsReducer from './formants';
import vowelReducer from './vowel';

export const store = configureStore({
  reducer: {
    formants: formantsReducer,
    vowel: vowelReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
