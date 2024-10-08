import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLogin } from '@api/authApi';
import { ILoginFormRequest, ILoginResponse } from '~/types/auth.interface';
import { IBaseResponse } from '~/types/base.interface';
import Cookies from 'js-cookie';
interface AuthState {
  user: {
    full_name: string;
    email: string;
    image_url: string;
    role: string[];
  } | null;
  accessToken: string | null;
  status: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: ILoginFormRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<ILoginResponse> = await getLogin(data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = false;
      state.error = null;
    },
    setCookie(state) {
      if (state.accessToken) {
        Cookies.set('accessToken', state.accessToken, { expires: 7 });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = true;
        state.user = {
          full_name: action.payload.full_name,
          email: action.payload.email,
          image_url: action.payload.image_url,
          role: action.payload.role,
        };
        state.accessToken = action.payload.access_token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCookie } = authSlice.actions;
export default authSlice.reducer;
