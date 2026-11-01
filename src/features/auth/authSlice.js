
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.access_token;
    },

    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
