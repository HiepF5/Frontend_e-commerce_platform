import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  subscribeShopApi, 
  followShopApi, 
  deleteShopApi, 
  restoreShopApi, 
  updateShopDetailApi,
  getShopDetailApi
} from '@api/shopApi';
import { IShopRequest, IShopFollowRequest, IInfoShop, IShopDetails } from '~/types/shop.interface';

interface ShopState {
  shopData: IShopDetails | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ShopState = {
  shopData: null,
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async thunk for subscribing to the shop
export const subscribeShop = createAsyncThunk(
  'shop/subscribe',
  async (shopData: IShopRequest, { rejectWithValue }) => {
    try {
      const response = await subscribeShopApi(shopData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to subscribe shop');
    }
  }
);
export const updateShop = createAsyncThunk(
  'shop/update',
  async (shopData: IInfoShop, { rejectWithValue }) => {
    try {
      const response = await updateShopDetailApi(shopData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to subscribe shop');
    }
  }
);

// Async thunk for following/unfollowing the shop
export const followShop = createAsyncThunk(
  'shop/follow',
  async (followData: IShopFollowRequest, { rejectWithValue }) => {
    try {
      const response = await followShopApi(followData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to follow/unfollow shop');
    }
  }
);

// Async thunk for removing the shop
export const removeShop = createAsyncThunk(
  'shop/remove',
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteShopApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove shop');
    }
  }
);

// Async thunk for restoring the shop
export const restoreShop = createAsyncThunk(
  'shop/restore',
  async (_, { rejectWithValue }) => {
    try {
      const response = await restoreShopApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to restore shop');
    }
  }
);
//
export const getShopDetail = createAsyncThunk(
  'shop/getShopDetail',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getShopDetailApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get shop detail');
    }
  }
);
// Slice
const ShopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    resetShopState: (state) => {
      state.shopData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Subscribe shop case
    builder
      .addCase(subscribeShop.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(subscribeShop.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        const { code, message } = action.payload;
        if (code === 200) {
          state.message = message;
        } else {
          state.error = message;
        }
      })
      .addCase(subscribeShop.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

    // Follow shop case
      .addCase(followShop.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(followShop.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        const { code, message } = action.payload;
        if (code === 200) {
          state.message = message;
        } else {
          state.error = message;
        }
      })
      .addCase(followShop.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

    // Remove shop case
      .addCase(removeShop.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(removeShop.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        const { message } = action.payload;
        state.message = message;
      })
      .addCase(removeShop.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

    // Restore shop case
      .addCase(restoreShop.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(restoreShop.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        const { message } = action.payload;
        state.message = message;
      })
      .addCase(restoreShop.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      // Update shop case
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateShop.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        const { message } = action.payload;
        state.message = message;
      })
      .addCase(updateShop.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload
      })
      //
      .addCase(getShopDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShopDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.shopData = action.payload.data;
      })
      .addCase(getShopDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetShopState } = ShopSlice.actions;

export default ShopSlice.reducer;
