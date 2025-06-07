// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import heartRateReducer from './hrfslice';

const store = configureStore({
  reducer: {
    heartRate: heartRateReducer,
  },
});

export default store;