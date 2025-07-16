import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

type TFeedsState = {
  isLoading: boolean;
  data: TOrdersData;
  error: SerializedError | null;
};

const initialState: TFeedsState = {
  isLoading: false,
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null
};

export const fetchFeedsThunk = createAsyncThunk(
  'feeds/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default feedsSlice.reducer;
