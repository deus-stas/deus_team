// app/store.js

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './redux/reducers'; // Проверьте правильность пути

// Создайте store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

// Создайте wrapper для Next.js
export const wrapper = createWrapper(() => store);