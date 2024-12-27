import axios from '@shared/libs/axios/axiosInterceptor';
import { IInfoShop, IShopDetails, IShopFollowRequest, IShopRequest } from '~/types/shop.interface';
import { IBaseResponse } from '~/types/base.interface';
import { API_ENDPOINTS_SHOP } from '@config/apiConfig';

export const subscribeShopApi = async (shopData: IShopRequest): Promise<IBaseResponse<string>> => {
  try {
    const formData = new FormData();
    formData.append('subscribe_body', JSON.stringify(shopData.subscribe_body));
    if (shopData.frontCard) {
      formData.append('front_card', shopData.frontCard);
    }
    if (shopData.backCard) {
      formData.append('back_card', shopData.backCard);
    }
    const response = await axios.post<IBaseResponse<string>>(
      API_ENDPOINTS_SHOP.ApiCreateSubscribe,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in subscribeShopApi:', error);
    throw error;
  }
};
export const getShopDetailApi = async (): Promise<IBaseResponse<IShopDetails>> => {
  try {
    const response = await axios.get<IBaseResponse<IShopDetails>>(
      `${API_ENDPOINTS_SHOP.ApiGetShopDetail}`,
    )
    return response.data
  } catch (error) {
    console.error('Error in getShopDetailApi:', error)
    throw error
  }
}
export const getShopDetailApiByShopCode = async (shopCode: string): Promise<IBaseResponse<IShopDetails>> => {
  try {
    const response = await axios.get<IBaseResponse<IShopDetails>>(
      `${API_ENDPOINTS_SHOP.ApiGetShopByShopCode}`,
      {
        params: { shopCode },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in getShopDetailApi:', error)
    throw error
  }
}

export const updateShopDetailApi = async (data: IInfoShop): Promise<IBaseResponse<IShopDetails>> => {
  try {
    const response = await axios.put<IBaseResponse<IShopDetails>>(
      `${API_ENDPOINTS_SHOP.ApiUpdateShop}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error in updateShopDetailApi:', error)
    throw error
  }
}
export const deleteShopApi  = async (): Promise<IBaseResponse<string>> => {
  try {
    const response = await axios.delete<IBaseResponse<string>>(
      `${API_ENDPOINTS_SHOP.ApiRemoveShop}`,
    )
    return response.data
  } catch (error) {
    console.error('Error in deleteShopApi :', error)
    throw error
  }
}
export const restoreShopApi = async (): Promise<IBaseResponse<string>> => {
  try {
    const response = await axios.delete<IBaseResponse<string>>(
      `${API_ENDPOINTS_SHOP.ApiRestoreShop}`,
    )
    return response.data
  } catch (error) {
    console.error('Error in restoreShopApi:', error)
    throw error
  }
}
export const followShopApi = async (data :IShopFollowRequest): Promise<IBaseResponse<string>> => {
  try {
     const formData = new FormData();
    formData.append('shop_code', data.shop_code);
    formData.append('is_follow', data.is_follow.toString());
    const response = await axios.post<IBaseResponse<string>>(
      `${API_ENDPOINTS_SHOP.ApiFollowShop}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error in restoreShopApi:', error)
    throw error
  }
}
export const lockShopApi = async (): Promise<IBaseResponse<string>> => {
  try {
    const response = await axios.delete<IBaseResponse<string>>(
      `${API_ENDPOINTS_SHOP.ApiRestoreShop}`,
    )
    return response.data
  } catch (error) {
    console.error('Error in restoreShopApi:', error)
    throw error
  }
}
export const checkFollowByShopCode = async (shopCode: string): Promise<IBaseResponse<boolean>> => {
  try {
    const response = await axios.get<IBaseResponse<boolean>>(
      `${API_ENDPOINTS_SHOP.ApiCheckShopFollow}/${shopCode}`,
    )
    return response.data
  } catch (error) {
    console.error('Error in getShopDetailApi:', error)
    throw error
  }
}