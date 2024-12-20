// src/features/shopReview/shopReviewSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createReviewApi, getReviewByPageApi } from '@api/shopReviewApi'
import { ICreateReviewRequest, IGetReviewByPageRequest, IReview } from '~/types/shop-review.interface'
import { IBaseResponse } from '~/types/base.interface'
import { getShopDetailApiByShopCode } from '~/api/shopApi'

interface ShopReviewState {
  reviews: Record<number, IReview[]>
  loading: boolean
  error: string | null
}

const initialState: ShopReviewState = {
  reviews: [],
  loading: false,
  error: null
}

export const fetchReviews = createAsyncThunk(
  'shopReview/fetchReviews',
  async (shopData: IGetReviewByPageRequest) => {
     ;
    const response: IBaseResponse<IReview[]> =
      await getReviewByPageApi(shopData)
    const rating = shopData.rating;
    return { rating, reviews: response.data }
  }
)
export const createReview = createAsyncThunk(
  'shopReview/createReview',
  async (reviewData: ICreateReviewRequest) => {
    const response: IBaseResponse<IReview> = await createReviewApi(reviewData)
    return response.data
  }
)


const shopReviewSlice = createSlice({
  name: 'shopReview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.rating !== undefined) {
          state.reviews[action.payload.rating] = action.payload.reviews
        }
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch reviews'
      })
  }
})

export default shopReviewSlice.reducer
