import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import brainReducer from './reduxSlice';

export const store = configureStore({
  reducer: {
    brain: brainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
