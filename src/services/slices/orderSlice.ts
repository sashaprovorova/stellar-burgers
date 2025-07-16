import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isLoading: boolean;
  isModalLoading: boolean;
  orders: TOrder[];
  selectedOrder: TOrder | null;
  error: SerializedError | null;
};

const initialState: TOrdersState = {
  isLoading: false,
  isModalLoading: false,
  orders: [],
  selectedOrder: null,
  error: null
};

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getOrdersApi();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchOrdersByNumberThunk = createAsyncThunk(
  'orders/fetchByNumber',
  async (number: number, thunkAPI) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  'orders/create',
  async (ingredientsId: string[], thunkAPI) => {
    try {
      const res = await orderBurgerApi(ingredientsId);
      return res.order;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchOrdersByNumberThunk.pending, (state) => {
        state.isModalLoading = true;
      })
      .addCase(fetchOrdersByNumberThunk.fulfilled, (state, action) => {
        state.isModalLoading = false;
        state.selectedOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersByNumberThunk.rejected, (state, action) => {
        state.isModalLoading = false;
        state.error = action.error;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      });
  }
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
