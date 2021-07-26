import { configureStore } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';
import { isEqual } from 'lodash-es';

import { userSlice } from '../domain/user/redux/slice/user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useShallowEqualSelector = <TState = RootState, TSelected = unknown>(
  selector: (state: TState) => TSelected
) => {
  return useSelector<TState, TSelected>(selector, shallowEqual);
};

export const useDeepEqualSelector = <TState = RootState, TSelected = unknown>(
  selector: (state: TState) => TSelected
) => {
  return useSelector<TState, TSelected>(selector, isEqual);
};

export { useSelector, useStore };
