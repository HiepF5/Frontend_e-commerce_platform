export interface IShopRequest {
  subscribe_body: IInfoShop;
  frontCard: File | null;
  backCard: File | null;
}
export interface IInfoShop {
  businessType: number;
  shopName: string;
  description: string;
  address: string;
  shopHotLine: string;
  shopEmail: string;
  taxCode?: string | null;
  identityCode: string;
  fullName: string;
  wardId: string;
  districtId: string;
  provinceId: string;
}

export interface IShopDetails {
  businessType: string;
  shopName: string;
  shopLogo: string;
  description: string;
  address: string;
  shopHotLine: string;
  shopEmail: string;
  taxCode: string | null;
  identityCode: string;
  fullName: string;
  frontIdentityCard: string;
  backIdentityCard: string;
  rating: number;
  productQuantity: number;
  followCount: number;
  waitingOrder: number;
  processOrder: number;
  deliveringOrder: number;
  successOrder: number;
  cancelOrder: number;
  returnOrder: number;
  wardId: string;
  districtId: string;
  provinceId: string;
  createdAt: string;
  createdBy: string;
}
export interface IShopFollowRequest {
  shop_code: string;
  is_follow: boolean;
}
export interface IShopLock {
  shop_code: string;
  enable: boolean;
}
