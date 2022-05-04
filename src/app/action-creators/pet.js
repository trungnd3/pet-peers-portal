import { createAsyncThunk } from '@reduxjs/toolkit';
import { replace, updateOwner } from '../slices/pet';
import { ADD_PET_URL, BUY_PET_URL, GET_PETS_URL } from '../../config';

export const selectStatus = (state) => state.pet.status;

export const selectAllPets = (state) => state.pet.items;

export const selectOwnedPets = (state) =>
  state.pet.items.filter(
    (item) => item.owner !== undefined && item.owner === state.auth.user
  );

export const selectTotalCount = (state) => state.pet.items.length;

export const selectSoldCount = (state) =>
  state.pet.items.filter((item) => item.owner !== undefined).length || 0;

export const addPet = createAsyncThunk(
  'pet/add',
  async ({ name, age, place }, { rejectWithValue }) => {
    try {
      const response = await fetch(ADD_PET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, place }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.payload.message);
      }
      const data = await response.json();
      return data.pet;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const buyPet = (user, petId) => {
  return async (dispatch) => {
    const response = await fetch(BUY_PET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, petId }),
    });
    const data = await response.json();
    dispatch(updateOwner(data.pet));
  };
};

export const fetchPetsAsync = createAsyncThunk(
  'pet/fetchAsync',
  async (_, { getState, rejectWithValue }) => {
    const curState = getState();
    try {
      if (!curState.pet.init) {
        const response = await fetch(GET_PETS_URL);
        if (!response.ok) {
          throw new Error('Fetch pets failed!');
        }
        const data = await response.json();
        return data.pets;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPets = () => {
  return async (dispatch, getState) => {
    const curState = getState();
    try {
      if (!curState.pet.init) {
        const response = await fetch(GET_PETS_URL);
        if (!response.ok) {
          throw new Error('Fetch pets failed!');
        }
        const data = await response.json();
        dispatch(replace(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
