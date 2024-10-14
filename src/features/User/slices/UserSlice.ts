import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBaseResponse } from '~/types/base.interface';
import { IGetUserDetailRequest, IUser } from '~/types/users.interface';
import { getUserInfo } from '@api/userApi';
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

// Tạo slice cho Redux
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});
export const {  } = UserSlice.actions;
export default UserSlice.reducer;