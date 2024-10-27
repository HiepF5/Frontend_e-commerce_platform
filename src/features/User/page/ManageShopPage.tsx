import { IShopDetails } from '~/types/shop.interface'
import { ManageShop } from '../components/ManageShop'
import { Typography } from '@mui/material'
// Dữ liệu mẫu
const shopData: IShopDetails = {
  businessType: 'HO_KINH_DOANH',
  shopName: 'anshop123r434523',
  shopLogo: 'shop.png',
  description: 'e',
  address: 'Hưng Yêne',
  shopHotLine: '1242342',
  shopEmail: 'h@gmail.com',
  taxCode: null,
  identityCode: '',
  fullName: '',
  frontIdentityCard:
    'http://res.cloudinary.com/dcejjvibg/image/upload/v1729977678/zaagfa2helomixqgu10m.png',
  backIdentityCard:
    'http://res.cloudinary.com/dcejjvibg/image/upload/v1729977678/aar3t4js5detdoqvg1on.png',
  rating: 0.0,
  productQuantity: 0,
  followCount: 0,
  waitingOrder: 0,
  processOrder: 0,
  deliveringOrder: 0,
  successOrder: 0,
  cancelOrder: 0,
  returnOrder: 0,
  wardId: '',
  districtId: '',
  provinceId: '',
  createdAt: '27/10/2024 04:21:19',
  createdBy: 'nguyenconghiepnguyen171110@gmail.com'
}

const ManageShopPage = () => {
  return (
    <div>
      <ManageShop data={shopData} />
    </div>
  )
}

export default ManageShopPage