// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null, // You can store user details here (e.g., email, ID, profile picture URL)
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user; // Expects action.payload = { user: {...} }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;