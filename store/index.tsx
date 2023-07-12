import React, { ReactNode } from 'react';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { userReducer, userSlice } from '../utils/auth/userSlice';
import {
  imageModalReducer,
  imageModalSlice,
} from '../components/Editor/nodes/ImageModal/imageModalSlice';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userReducer,
    [imageModalSlice.name]: imageModalReducer,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type StoreAction<R> = ThunkAction<Promise<R>, ReduxState, unknown, AnyAction>;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
