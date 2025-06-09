// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other slices here as your app grows (e.g., profile: profileReducer)
  },
});

export default store;
