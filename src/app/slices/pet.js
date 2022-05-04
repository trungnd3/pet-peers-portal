import { createSlice } from '@reduxjs/toolkit';
import { addPet, fetchPetsAsync } from '../action-creators/pet';

const initialState = {
  items: [],
  init: false,
  status: {
    loading: 'idle',
    error: '',
  },
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    replace(state, action) {
      state.items = action.payload.pets;
      state.init = true;
    },
    updateOwner(state, action) {
      const { id, owner } = action.payload;
      const idx = state.items.findIndex((i) => i.id === id);
      state.items[idx].owner = owner;
    },
    error(state, action) {
      state.status.loading = 'failed';
      state.status.error = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPet.pending, (state) => {
        state.status.loading = 'pending';
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.status.loading = 'success';
        state.items.push({ ...action.payload });
      })
      .addCase(addPet.rejected, (state) => {
        state.status.loading = 'failed';
        state.status.error = 'Cannot add new pet';
      })
      .addCase(fetchPetsAsync.pending, (state) => {
        state.status.loading = 'pending';
      })
      .addCase(fetchPetsAsync.fulfilled, (state, action) => {
        state.status.loading = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPetsAsync.rejected, (state) => {
        state.status.loading = 'failed';
        state.status.error = 'Cannot fetch pets';
      }),
});

export const { error, replace, updateOwner } = petSlice.actions;

export default petSlice.reducer;
