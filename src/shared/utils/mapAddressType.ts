import { AddressType } from "~/types/address.interface";

export const mapAddressType = (type: string): AddressType => {
  switch (type) {
    case 'Nhà Riêng': 
      return 1; 
    case 'Văn Phòng':
      return 2; 
    default:
      throw new Error(`Unknown address type: ${type}`);
  }
}
