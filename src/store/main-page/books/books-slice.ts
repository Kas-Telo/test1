import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { booksApi } from "../../../api/books/books-api";
import { BookCardType, CategoryType } from "../../../api/books/books-api-types";
import { handleAsyncServerNetworkError } from "../../../common/utils/error-util";
import { ThunkApiTypeForAsyncThunk } from "../..";

const updateCategories = createAction<{ categories: DomainCategoryType[] }>("booksActions/updateCategories");
const changeSortValue = createAction<{ sortValue: SortValueType }>("booksActions/changeSortValue");
const setIsFirstLoadCategories = createAction<{ isFirstLoadCategories: boolean }>(
    "booksActions/setIsFirstLoadCategories"
);

export const fetchCategories = createAsyncThunk<DomainCategoryType[], unknown, ThunkApiTypeForAsyncThunk>(
    "books/fetchCategories",
    async (_, thunkApi) => {
        try {
            const response = await booksApi.getCategories();

            return response.data.map((el) => ({ ...el, count: null }));
        } catch (e) {
            return handleAsyncServerNetworkError(e, thunkApi, true);
        }
    }
);
export const fetchBooks = createAsyncThunk<BookCardType[], unknown, ThunkApiTypeForAsyncThunk>(
    "books/fetchBooks",
    async (_, thunkApi) => {
        try {
            const response = await booksApi.getBooks();
            const isFirstLoad = thunkApi.getState().books.isFirstLoadCategories;

            if (isFirstLoad) {
                let copyCategories = [...thunkApi.getState().books.categories];

                response.data.forEach((book) => {
                    copyCategories = copyCategories.map((category) =>
                        book.categories?.includes(category.name)
                            ? {
                                ...category,
                                count: category.count ? category.count + 1 : 1
                            }
                            : category.count
                                ? category
                                : { ...category, count: 0 }
                    );
                });

                thunkApi.dispatch(updateCategories({ categories: copyCategories }));
                thunkApi.dispatch(setIsFirstLoadCategories({ isFirstLoadCategories: false }));
            }

            return response.data;
        } catch (e) {
            return handleAsyncServerNetworkError(e, thunkApi, true);
        }
    }
);

const initialState = {
    bookCardList: [] as BookCardType[],
    categories: [] as DomainCategoryType[],
    isFirstLoadCategories: true,
    currentSortValue: "descending" as SortValueType
};

const slice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = ac;
            "descending";
            descending;
            ";
        });
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.bookCardList = action.payload;
        });
        builder.addCase(updateCategories, (state, action) => {
            state.categories = action.payload.categories;
        });
        builder.addCase(setIsFirstLoadCategories, (state, action) => {
            state.isFirstLoadCategories = action.payload.isFirstLoadCategories;
        });
        builder.addCase(changeSortValue, (state, action) => {
            state.currentSortValue = action.payload.sortValue;
        });
    }
});

export const booksReducer = slice.reducer;
export const asyncBooksActions = {
    fetchCategories,
    fetchBooks
};
export const syncBooksActions = {
    changeSortValue
};
export type DomainCategoryType = CategoryType & {
    count: number | null;
};
export type SortValueType = "ascending" | "descending";
