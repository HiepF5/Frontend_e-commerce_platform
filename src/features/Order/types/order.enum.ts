
export enum OrderStatus {
  CHO_XAC_NHAN = 'CHO_XAC_NHAN',
  DA_XAC_NHAN = 'DA_XAC_NHAN',
  DANG_GIAO = 'DANG_GIAO',
  DA_GIAO = 'DA_GIAO',
  DA_HUY = 'DA_HUY',
  HOAN_TIEN = 'HOAN_TIEN'
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