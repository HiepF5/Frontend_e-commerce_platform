// src/api/shopReviewApi.ts

import axios from '@shared/libs/axios/axiosInterceptor';
import { IBaseResponse } from '~/types/base.interface';
import { API_ENDPOINTS_SHOPREVIEW } from '@config/apiConfig';
import { ICreateReviewRequest, IGetReviewByPageRequest, IReview } from '~/types/shop-review.interface';

export const getReviewByPageApi = async (shopData: IGetReviewByPageRequest): Promise<IBaseResponse<IReview[]>> => {
  try {
    const response = await axios.post<IBaseResponse<IReview[]>>(
      API_ENDPOINTS_SHOPREVIEW.ApiGetReviewByPage,
      shopData
    );

    return response.data;
  } catch (error) {
    console.error('Error in getReviewByPageApi:', error);
    throw error;
  }
};
export const createReviewApi = async (reviewData: ICreateReviewRequest): Promise<IBaseResponse<IReview>> => {
  try {
    const response = await axios.post<IBaseResponse<IReview>>(API_ENDPOINTS_SHOPREVIEW.ApiCreateReview, reviewData);

    return response.data;
  } catch (error) {
    console.error('Error in createRevrviewApi:', error);
    throw error;
  }
}
export const updateReviewApi = async (reviewData: IReview): Promise<IBaseResponse<IReview>> => {
  try {
    const response = await axios.put<IBaseResponse<IReview>>(API_ENDPOINTS_SHOPREVIEW.ApiUpdateReview, reviewData);

    return response.data;
  } catch (error) {
    console.error('Error in updateReviewApi:', error);
    throw error;
  }
}
export const deleteReviewApi = async (reviewData: IReview): Promise<IBaseResponse<IReview>> => {
  try {
    const response = await axios.delete<IBaseResponse<IReview>>(API_ENDPOINTS_SHOPREVIEW.ApiDeleteReview, { data: reviewData });

    return response.data;
  } catch (error) {
    console.error('Error in deleteReviewApi:', error);
    throw error;
  }
}
export const getMyReviewApi = async (shopData: IGetReviewByPageRequest): Promise<IBaseResponse<IReview[]>> => {
  try {
    const response = await axios.post<IBaseResponse<IReview[]>>(API_ENDPOINTS_SHOPREVIEW.ApiMyReview, shopData);

    return response.data;
  } catch (error) {
    console.error('Error in getMyReviewApi:', error);
    throw error;
  }
}
export const adminDeleteReviewApi = async (reviewData: IReview): Promise<IBaseResponse<IReview>> => {
  try {
    const response = await axios.delete<IBaseResponse<IReview>>(API_ENDPOINTS_SHOPREVIEW.ApiAdminDeleteReview, { data: reviewData });

    return response.data;
  } catch (error) {
    console.error('Error in adminDeleteReviewApi:', error);
    throw error;
  }
}
export const ownerReplyReviewApi = async (reviewData: IReview): Promise<IBaseResponse<IReview>> => {
  try {
    const response = await axios.put<IBaseResponse<IReview>>(API_ENDPOINTS_SHOPREVIEW.ApiOwnerReplyReview, reviewData);

    return response.data;
  } catch (error) {
    console.error('Error in ownerReplyReviewApi:', error);
    throw error;
  }
}