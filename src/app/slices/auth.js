import { createSlice } from '@reduxjs/toolkit';
import { addUser, authenticate } from '../action-creators/auth';

const storedUser = localStorage.getItem('user');

const initialState = {
  isLoggedIn: !!storedUser,
  token: '',
  user: storedUser,
  status: {
    loading: 'idle',
    error: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = '';
      state.status = initialState.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status.loading = 'pending';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status.loading = 'success';
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status.loading = 'failed';
        state.status.error = action.payload;
      })
      .addCase(authenticate.pending, (state) => {
        state.status.loading = 'pending';
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status.loading = 'success';
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status.loading = 'failed';
        state.status.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
