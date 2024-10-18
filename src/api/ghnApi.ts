import axios from '@shared/libs/axios/axiosInterceptor';
import { IBaseResponse } from '~/types/base.interface';
import { API_ENDPOINTS_GHN } from '@config/apiConfig';
import { IAddressGhnResponse, IDistrictData, IDistrictRequest, IProvinceData, IWardData, IWardRequest,  } from '~/types/ghn.interface';

export const getProvinceApi = async (): Promise<IBaseResponse<IAddressGhnResponse<IProvinceData>>> => {
  try {
    const response = await axios.get<IBaseResponse<IAddressGhnResponse<IProvinceData>>>(`${API_ENDPOINTS_GHN.ApiGetProvince}`);
    return response.data;
  } catch (error) {
    console.error('Error in getProvinceApi:', error);
    throw error;
  }
};
export const getDistrictApi = async (data: IDistrictRequest): Promise<IBaseResponse<IAddressGhnResponse<IDistrictData>>> => {
  try {
    const response = await axios.get<IBaseResponse<IAddressGhnResponse<IDistrictData>>>(
      `${API_ENDPOINTS_GHN.ApiGetDistrict}`,
      {
        params: {
          province_id: data.province_id
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in getDistrictApi:', error);
    throw error;
  }
};
export const getWardApi = async (data: IWardRequest): Promise<IBaseResponse<IAddressGhnResponse<IWardData>>> => {
  try {
    const response = await axios.get<IBaseResponse<IAddressGhnResponse<IWardData>>>(
      `${API_ENDPOINTS_GHN.ApiGetWard}`,
      {
        params: {
          district_id: data.district_id,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in getWardApi:', error);
    throw error;
  }
};