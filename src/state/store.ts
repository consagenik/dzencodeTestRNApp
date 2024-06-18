import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-community/async-storage';

import commentsReducer from './slices/commentsSlice';

const reducers = combineReducers({
  comments: commentsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['comments'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
