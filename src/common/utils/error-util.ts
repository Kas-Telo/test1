import axios, { AxiosError } from 'axios';

import { ResponseErrorType } from '../../api/books/books-api-types';
import { AppDispatch, RootStateType } from '../../store';
import { syncAppActions } from '../../store/app/app-slice';

export type ThunkApiType = {
  dispatch: AppDispatch;
  rejectWithValue: (arg: any) => any;
  getState: () => RootStateType;
};

export const handleAsyncServerNetworkError = (e: unknown, thunkAPI: ThunkApiType, showError = true) => {
  const err = e as Error | AxiosError<ResponseErrorType, any>;

  if (showError) {
    thunkAPI.dispatch(
      syncAppActions.setAppError(
        axios.isAxiosError(err)
          ? {
              error: err.response?.data
                ? err.response.data.error.message
                : 'Что-то пошло не так. Обновите страницу через некоторое время.',
            }
          : { error: err.message ? err.message : 'Some error occurred' }
      )
    );
  }
  thunkAPI.dispatch(syncAppActions.toggleLoading({ isLoading: false }));

  return thunkAPI.rejectWithValue(
    axios.isAxiosError(err)
      ? {
          error: err.response?.data
            ? err.response.data.error.message
            : 'Что-то пошло не так. Обновите страницу через некоторое время.',
        }
      : { error: err.message ? err.message : 'Some error occurred' }
  );
};
