interface ApiError {
  status: number
  data: {
    message: string
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as ApiError).data.message === 'string'
  )
}

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.data.message
  }
  return 'An unexpected error occurred'
} 