import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TIngredientState = {
  isLoading: boolean;
  data: TIngredient[];
  error: SerializedError | null;
};

const initialState: TIngredientState = {
  isLoading: false,
  data: [],
  error: null
};

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default ingredientsSlice.reducer;
export const {} = ingredientsSlice.actions;
