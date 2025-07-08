import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  getUserApi,
  logoutApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { clearTokens, storeTokens } from '../../utils/token';

interface userState {
  user: null | { name: string; email: string };
  isLoading: boolean;
  isAuthChecked: boolean;
  registerError: string | null;
  loginError: string | null;
}

const initialState: userState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  registerError: null,
  loginError: null
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (
    {
      name,
      email,
      password
    }: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await registerUserApi({ name, email, password });
      const { user, accessToken, refreshToken } = response;
      storeTokens(refreshToken, accessToken);
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await loginUserApi({ email, password });
      const { user, accessToken, refreshToken } = response;
      storeTokens(refreshToken, accessToken);
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const response = await forgotPasswordApi({ email });
      return response.success;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  async (
    { password, token }: { password: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await resetPasswordApi({ password, token });
      return response.success;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (
    data: Partial<{ name: string; email: string; password: string }>,
    thunkAPI
  ) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      clearTokens();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.registerError =
          (action.payload as string) || 'Ошибка регистрации';
      })
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuthThunk.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.name = action.payload.name;
          state.user.email = action.payload.email;
        }
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
