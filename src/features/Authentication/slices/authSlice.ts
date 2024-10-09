import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLogin, postSignup } from '@api/authApi';
import { ILoginFormRequest, ILoginResponse, ISignupFormRequest } from '~/types/auth.interface';
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
  code: number ;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: false,
  error: null,
  code: 0,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: ILoginFormRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<ILoginResponse> = await getLogin(data);
      return response; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login');
    }
  }
);
export const signup = createAsyncThunk(
  'auth/signup',
  async (data: ISignupFormRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await postSignup(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to signup');
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
      //login
      .addCase(login.pending, (state) => {
        state.status = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = true;
        state.user = {
          full_name: action.payload.data.full_name,
          email: action.payload.data.email,
          image_url: action.payload.data.image_url,
          role: action.payload.data.role,
        };
        state.accessToken = action.payload.data.access_token;
        state.code = action.payload.code as number;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
      //signup
      .addCase(signup.pending, (state) => {
        state.status = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = true;
        state.error = null;
        state.code = action.payload.code as number;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
  },
});

export const { logout, setCookie } = authSlice.actions;
export default authSlice.reducer;
