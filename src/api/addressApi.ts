import axios from '@shared/libs/axios/axiosInterceptor';
import { IBaseResponse } from '~/types/base.interface';
import { API_ENDPOINTS_ADDRESS } from '@config/apiConfig';
import { IAddress, IAddressRequest, IDeleteAddressRequest } from '~/types/address.interface';

export const getAllAddressApi = async (): Promise<IBaseResponse<IAddress[]>> => {
  try {
    const response = await axios.get<IBaseResponse<IAddress[]>>(`${API_ENDPOINTS_ADDRESS.ApiGetAllAddress}`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllAddress:', error);
    throw error;
  }
};
export const createAddressApi = async (data : IAddressRequest): Promise<IBaseResponse<IAddress>> => {
  try {
    const response = await axios.post<IBaseResponse<IAddress>>(`${API_ENDPOINTS_ADDRESS.ApiCreateAddress}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in createAddress:', error);
    throw error;
  }
};
export const updateAddressApi = async (data : IAddressRequest): Promise<IBaseResponse<IAddress>> => {
  try {
    const response = await axios.put<IBaseResponse<IAddress>>(`${API_ENDPOINTS_ADDRESS.ApiUpdateAddress}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in updateAddress:', error);
    throw error;
  }
};
export const deleteAddressApi = async (data: IDeleteAddressRequest): Promise<IBaseResponse<string>> => {
  try {
    const form_data = new FormData();
    form_data.append('address_id', data.addressId)
    const response = await axios.delete<IBaseResponse<string>>(`${API_ENDPOINTS_ADDRESS.ApiDeleteAddress}`, {
      data: form_data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in deleteAddress:', error);
    throw error;
  }
};