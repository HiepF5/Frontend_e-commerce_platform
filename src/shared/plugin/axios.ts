import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { getCookie } from 'typescript-cookie'
import apiAuth from '@api/auth'
import apiUser from '@api/user'

const commonInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENV !== 'production'
      ? import.meta.env.VITE_BASE_URL_PRODUCT
      : import.meta.env.VITE_BASE_URL_DEVELOP
})

const accessToken = getCookie('access_token')

commonInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${accessToken}`
      })
    }
    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

commonInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      // handle error
      // TODO: logout when 401
    }
    return Promise.reject(error)
  }
)

const factories = {
  auth: apiAuth(commonInstance),
  user: apiUser(commonInstance)
}

export { commonInstance, factories }


// delete