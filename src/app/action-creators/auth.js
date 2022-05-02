import { createAsyncThunk } from '@reduxjs/toolkit';
import { SIGNIN_URL, SIGNUP_URL, CHECK_EXIST_URL } from '../../config';
import { logout } from '../slices/auth';

export const selectStatus = (state) => state.auth.status;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const d = await response.json();
        console.log(d);
        throw new Error();
      }
      const data = await response.json();
      localStorage.setItem('user', data.user);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  'auth/addUser',
  async ({ username, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const unqRes = await fetch(`${CHECK_EXIST_URL}/${username}`);
      if (!unqRes.ok) {
        const d = await unqRes.json();
        throw new Error('Error');
      }
      const result = await unqRes.json();

      if (!!result.exist) {
        return rejectWithValue(
          'User Name already in use. Please select a different User Name'
        );
      }

      const regRes = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });
      if (!regRes.ok) {
        const d = await regRes.json();
        throw new Error();
      }
      const data = await regRes.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch(logout());
  };
};
