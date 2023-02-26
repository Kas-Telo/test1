import { createAction, createSlice } from '@reduxjs/toolkit';

type StateType = {
  isLoading: boolean;
  appError: string | null;
};

const toggleLoading = createAction<{ isLoading: boolean }>('appActions/toggleLoading');
const setAppError = createAction<{ error: string | null }>('appActions/setError');

export const initialState: StateType = {
  isLoading: true,
  appError: null,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleLoading, (state, action) => {
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(setAppError, (state, action) => {
      state.appError = action.payload.error;
    });
  },
});

export const appReducer = slice.reducer;
export const syncAppActions = {
  toggleLoading,
  setAppError,
};
