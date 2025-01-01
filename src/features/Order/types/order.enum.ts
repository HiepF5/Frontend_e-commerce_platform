
export enum OrderStatus {
  CHO_XAC_NHAN = 'CHO_XAC_NHAN',
  DANG_LAY_HANG = 'DANG_LAY_HANG',
  DANG_GIAO_HANG = 'DANG_GIAO_HANG',
  GH_THANH_CONG = 'GH_THANH_CONG',
  DA_HUY = 'DA_HUY',
  TRA_HANG = 'TRA_HANG'
}
export enum OrderAdminStatus {
  UNKNOWN = '',
  CHO_THANH_TOAN = 'CHO_THANH_TOAN',
  DANG_XU_LY = 'DANG_XU_LY',
  HOAN_THANH = 'HOAN_THANH',
  DA_HUY = 'DA_HUY',
}

export enum DeliveryMethod {
  GHN = 'GHN',
  GHTK = 'GHTK',
  NINJA_VAN = 'NINJA_VAN'
}

export enum PaymentMethod {
  THANH_TOAN_KHI_GIAO_HANG = 'THANH_TOAN_KHI_GIAO_HANG',
  THANH_TOAN_ONLINE = 'THANH_TOAN_ONLINE'
}
export enum ShippingStatus {
  PENDING = 'PENDING',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED'
}