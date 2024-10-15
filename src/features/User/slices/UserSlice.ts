import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBaseResponse } from '~/types/base.interface';
import { IChangeInfoRequest, IChangePasswordRequest, IGetUserDetailRequest, IUser } from '~/types/users.interface';
import { getUserInfo, putChangeInfo, putChangePassword } from '@api/userApi';
interface UserState {
  status: boolean;
  accessToken: string | null;
  user: IUser | null;
  code: number | null;
  error: string | null;
}

const initialState: UserState = {
  status: false,
  accessToken: null,
  user: null,
  code: null,
  error: null,
};

// Async action để gọi API
export const getInfo = createAsyncThunk(
  'user/getInfo',
  async (data: IGetUserDetailRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IUser> = await getUserInfo(data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login');
    }
  }
);
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data: IChangePasswordRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await putChangePassword(data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to ChangPassword');
    }
  }
);
export const changeInfo = createAsyncThunk(
  'user/putChangeInfo',
  async (data: IChangeInfoRequest, { rejectWithValue }) => {
    debugger;
    try {
      const response: IBaseResponse<string> = await putChangeInfo(data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to ChangPassword');
    }
  }
);
// Tạo slice cho Redux
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfoUserLocalstorage(state) {
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
    // Xử lý cho action getInfo
      .addCase(getInfo.pending, (state) => {
        state.status = false;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload; 
        state.error = null;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as string;
      })
      // Xử lý cho action changePassword
      .addCase(changePassword.pending, (state) => {
        state.status = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = true;
        state.code = 200;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = false;
        state.code = 400;
        state.error = action.payload as string;
      })
      // Xử lý cho action changeInfo
      .addCase(changeInfo.pending, (state) => {
        state.status = false;
      })
      .addCase(changeInfo.fulfilled, (state, action) => {
        state.status = true;
        state.code = 200;
        state.error = null;
      })
      .addCase(changeInfo.rejected, (state, action) => {
        state.status = false;
        state.code = 400;
        state.error = action.payload as string;
      });
  },
});
export const {  setInfoUserLocalstorage } = UserSlice.actions;
export default UserSlice.reducer;