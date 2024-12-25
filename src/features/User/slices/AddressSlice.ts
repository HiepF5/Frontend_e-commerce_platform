import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IBaseResponse } from '~/types/base.interface'
import {
  IAddress,
  IAddressRequest,
  IDeleteAddressRequest
} from '~/types/address.interface'
import {
  getAllAddressApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi
} from '@api/addressApi'
interface AddressState {
  status: boolean
  accessToken: string | null
  address: IAddress[] | null
  code: number | null
  error: string | null
}

const initialState: AddressState = {
  status: false,
  accessToken: null,
  address: null,
  code: null,
  error: null
}

// Async action để gọi API
export const getAddress = createAsyncThunk(
  'user/getAddress',
  async (_, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IAddress[]> = await getAllAddressApi()
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to getAddress'
      )
    }
  }
)
export const createAddress = createAsyncThunk(
  'user/createAddress',
  async (data: IAddressRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IAddress> = await createAddressApi(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to createAddress'
      )
    }
  }
)
export const updateAddress = createAsyncThunk(
  'user/updateAddress',
  async (data: IAddressRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IAddress> = await updateAddressApi(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to updateAddress'
      )
    }
  }
)
export const deleteAddress = createAsyncThunk(
  'user/deleteAddress',
  async (data: IDeleteAddressRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await deleteAddressApi(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to deleteAddress'
      )
    }
  }
)
// Tạo slice cho Redux
const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Xử lý cho action getAddress
      .addCase(getAddress.pending, (state) => {
        state.status = false
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.status = true
        state.address = action.payload as IAddress[]
        state.error = null
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })

      // Xử lý cho action createAddress
      .addCase(createAddress.pending, (state) => {
        state.status = false
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })

      // Xử lý cho action updateAddress
      .addCase(updateAddress.pending, (state) => {
        state.status = false
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })

      // Xử lý cho action deleteAddress
      .addCase(deleteAddress.pending, (state) => {
        state.status = false
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.status = true
        state.address = null
        state.error = null
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })

  }
})
export const {  } = AddressSlice.actions
export default AddressSlice.reducer
