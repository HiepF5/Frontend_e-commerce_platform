// Common Interfaces
export interface IWhiteListClient {
  From: any[];
  To: any[];
  Return: any[];
}

export interface IWhiteListLocation {
  From: any | null;
  To: any | null;
}
export interface IAddressGhnResponse<T> {
  code: number;
  message: string;
  data: T[];
}


// Province Interface
export interface IProvinceData {
  ProvinceID: number;
  ProvinceName: string;
  CountryID: number;
  Code: string;
  NameExtension: string[];
  IsEnable: number;
  RegionID: number;
  RegionCPN: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  AreaID: number;
  CanUpdateCOD: boolean;
  Status: number;
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}


// District Interface
export interface IDistrictRequest {
  province_id: string;
}

export interface IDistrictData {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  IsEnable: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: IWhiteListClient;
  WhiteListDistrict: IWhiteListLocation;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string[];
  UpdatedIP: string;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}

// Ward Interface
export interface IWardRequest {
  district_id: string;
}
export interface IWardData {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
  CanUpdateCOD: boolean;
  SupportType: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: IWhiteListClient;
  WhiteListWard: IWhiteListLocation;
  Status: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string[];
  CreatedIP: string;
  CreatedEmployee: number;
  CreatedSource: string;
  CreatedDate: string;
  UpdatedEmployee: number;
  UpdatedDate: string;
}
