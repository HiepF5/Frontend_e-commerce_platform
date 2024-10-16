export interface IAddress {
  address_id: number;
  address_type: string;
  full_name: string;
  phone_number: string;
  address: string;
  is_default: boolean;
  ward_id: string;
  district_id: string;
  province_id: string;
  note?: string; 
}
export interface IAddressRequest {
  addressId?: number;
  addressType: number;    
  fullName: string;       
  phoneNumber: string;  
  wardId: string;         
  districtId: string;   
  provinceId: string;    
  houseName: string;   
  wardName: string;     
  districtName: string; 
  provinceName: string; 
  note?: string;         
  isDefault: boolean;     
}
export interface IDeleteAddressRequest {
  addressId: string;
}
