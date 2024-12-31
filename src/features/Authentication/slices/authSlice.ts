import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getLogin,
  postRepassword,
  postSignup,
  postVerification,
  postCreateNewPassword
} from '@api/authApi'
import {
  ILoginFormRequest,
  ILoginResponse,
  INewPasswordRequest,
  IResetPasswordRequest,
  ISignupFormRequest,
  IVerificationRequest
} from '~/types/auth.interface'
import { IBaseResponse } from '~/types/base.interface'
import Cookies from 'js-cookie'
interface AuthState {
  user: {
    full_name: string
    email: string
    image_url: string
    role: string[]
    user_code: string
    shop_code: string
    gender: string
    date_of_birth: string
    phone_number: string
    access_token: string
    shop_id?: string
  } | null
  accessToken: string | null
  status: boolean
  error: string | null
  code: number
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: false,
  error: null,
  code: 0
}

export const login = createAsyncThunk(
  'auth/login',
  async (data: ILoginFormRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<ILoginResponse> = await getLogin(data)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to login')
    }
  }
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (data: ISignupFormRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await postSignup(data)
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to signup'
      )
    }
  }
)
export const verifycation = createAsyncThunk(
  'auth/verifycation',
  async (data: IVerificationRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await postVerification(data)
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to verifycation'
      )
    }
  }
)
export const rePassword = createAsyncThunk(
  'auth/rePassword',
  async (data: IResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await postRepassword(data)
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to rePassword'
      )
    }
  }
)
export const createPassword = createAsyncThunk(
  'auth/createPassword',
  async (data: INewPasswordRequest, { rejectWithValue }) => {
    try {
      const response: IBaseResponse<string> = await postCreateNewPassword(data)
      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to createPassword'
      )
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.accessToken = null
      state.status = false
      state.error = null
    },
    setCookie(state) {
      if (state.accessToken) {
        Cookies.set('accessToken', state.accessToken, { expires: 7 })
      }
    },
    setInfoUserLocalstorage(state) {
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    }
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.status = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = true
        state.user = {
          full_name: action.payload.data.full_name,
          email: action.payload.data.email,
          image_url: action.payload.data.image_url,
          role: action.payload.data.role,
          gender: action.payload.data.gender,
          user_code: action.payload.data.user_code,
          shop_code: action.payload.data.shop_code,
          date_of_birth: action.payload.data.date_of_birth,
          phone_number: action.payload.data.phone_number,
          access_token: action.payload.data.access_token,
          shop_id: action.payload.data.shop_id
        }
        state.accessToken = action.payload.data.access_token
        state.code = action.payload.code as number
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
      //signup
      .addCase(signup.pending, (state) => {
        state.status = false
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = true
        state.error = null
        state.code = action.payload.code as number
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
      //verifycation
      .addCase(verifycation.pending, (state) => {
        state.status = false
      })
      .addCase(verifycation.fulfilled, (state, action) => {
        state.status = true
        state.error = null
        state.code = action.payload.code as number
      })
      .addCase(verifycation.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
      //rePassword
      .addCase(rePassword.pending, (state) => {
        state.status = false
      })
      .addCase(rePassword.fulfilled, (state, action) => {
        state.status = true
        state.error = null
        state.code = action.payload.code as number
      })
      .addCase(rePassword.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
      //createPassword
      .addCase(createPassword.pending, (state) => {
        state.status = false
      })
      .addCase(createPassword.fulfilled, (state, action) => {
        state.status = true
        state.error = null
        state.code = action.payload.code as number
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.status = false
        state.error = action.payload as string
      })
  }
})

export const { logout, setCookie, setInfoUserLocalstorage } = authSlice.actions
export default authSlice.reducer
