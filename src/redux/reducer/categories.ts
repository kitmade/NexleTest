import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CategoriesState, SliceName} from '../../types';
import {categoriesApi} from '../../services';

const initialState = {
  categories: [],
  loading: false,
} as CategoriesState;

const getCategories = createAsyncThunk('categories', async () => {
  const response = await categoriesApi.getCategories();
  if (response.ok && response.data) {
    return response.data;
  } else {
    throw new Error(response.originalError?.message);
  }
});

const categoriesSlice = createSlice({
  name: SliceName.categories,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategories.rejected, state => {
      state.loading = false;
    });
  },
});
export const categoriesActions = {...categoriesSlice.actions, getCategories};
export default categoriesSlice;
