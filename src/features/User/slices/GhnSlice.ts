import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IBaseResponse } from '~/types/base.interface'
import {
  IAddressGhnResponse,
  IDistrictData,
  IDistrictRequest,
  IProvinceData,
  IWardData,
  IWardRequest
} from '~/types/ghn.interface'
import { getProvinceApi, getDistrictApi, getWardApi } from '@api/ghnApi'
interface GhnState {
  status: boolean
  accessToken: string | null
  provinces: IProvinceData[] | null
  districts: IDistrictData[] | null
  wards: IWardData[] | null
  code: number | null
  error: string | null
}

const initialState: GhnState = {
  status: false,
  accessToken: null,
  provinces: null,
  districts: null,
  wards: null,
  code: null,
  error: null,
}
export const getProvince = createAsyncThunk(
  'user/getProvince',
  async (_, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IAddressGhnResponse<IProvinceData>> =
        await getProvinceApi()
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to getProvince'
      )
    }
  }
)
export const getDistrict = createAsyncThunk(
  'user/getDistrict',
  async (data: IDistrictRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IAddressGhnResponse<IDistrictData>> =
        await getDistrictApi(data)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to getDistrict'
      )
    }
  }
)
export const getWard = createAsyncThunk(
  'user/getWard',
  async (data: IWardRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<IAddressGhnResponse<IWardData>> =
        await getWardApi(data)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to getWard'
      )
    }
  }
)
const GhnSlice = createSlice({
  name: 'ghn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getProvince
      .addCase(getProvince.pending, (state) => {
        state.status = true
      })
      .addCase(getProvince.fulfilled, (state, action) => {
        state.status = false
        state.provinces = action.payload as IProvinceData[]
        state.error = null
      })
      .addCase(getProvince.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
      // getDistrict
      .addCase(getDistrict.pending, (state) => {
        state.status = true
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.status = false
        state.districts = action.payload as IDistrictData[]
        state.error = null
      })
      .addCase(getDistrict.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
      // getWard
      .addCase(getWard.pending, (state) => {
        state.status = true
      })
      .addCase(getWard.fulfilled, (state, action) => {
        state.status = false
        state.wards = action.payload as IWardData[]
        state.error = null
      })
      .addCase(getWard.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
  }
})
export const {} = GhnSlice.actions
export default GhnSlice.reducer
