import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import petReducer from './slices/pet';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,
  },
});
