import thunk from 'redux-thunk';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from './app/app-slice';
import { bookReducer } from './book-page/book/book-slice';
import { booksReducer } from './main-page/books/books-slice';

const rootReducer = combineReducers({
  app: appReducer,
  books: booksReducer,
  book: bookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkApiTypeForAsyncThunk = {
  state: RootStateType;
  dispatch: AppDispatch;
  rejectValue: { error: string };
};
