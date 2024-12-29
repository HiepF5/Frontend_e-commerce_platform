import { Card } from '@mui/material'
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code'

export default function OrderReceipt() {
  const orderData = {
    orderNumber: 'OD80722885-0',
    sender: {
      name: 'Phần mềm Quản lý bán hàng Socialsoft',
      phone: '0867455335',
      address:
        'Tòa CT1 chung cư C14 Bắc Hà, đường Tố Hữu, phường Trung Văn, quận Nam Từ Liêm, Hà Nội'
    },
    receiver: {
      name: 'Hiếu Nguyễn Công/fsff',
      phone: '0975251857',
      address: 'Hà Nội, Quận Hai Bà Trưng, Phường minh khai, ngõ 4 ao sen'
    },
    orderDetails: {
      id: 'OD80722885-0',
      date: '31-07-2024 15:50',
      transitDate: '31-07-2024 15:50',
      weight: '0.500KG'
    },
    products: [
      {
        name: 'SV3 Áo nam sát nách thể thao SevenF',
        code: 'SV3',
        quantity: 1,
        price: '150,000 VND'
      }
    ],
    shipping: '18,325 VND',
    total: '366,325 VND'
  }

  return (
    <Card className='w-full max-w-3xl mx-auto p-6 space-y-4'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <img
          src='https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg'
          alt='Company Logo'
          width={80}
          height={40}
          className='object-contain'
        />
        <h1 className='text-xl font-semibold'>Đơn Đặt Hàng</h1>
        <button className='text-teal-600 hover:text-teal-700'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
            />
          </svg>
        </button>
      </div>

      {/* Barcode */}
      <div className='flex justify-center py-4'>
        <Barcode value={orderData.orderNumber} />
      </div>

      {/* Sender & Receiver Info */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4'>
        <div>
          <p className='font-medium'>Người gửi: {orderData.sender.name}</p>
          <p>SĐT: {orderData.sender.phone}</p>
          <p className='text-sm text-gray-600'>{orderData.sender.address}</p>
        </div>
        <div className='flex justify-between'>
          <div>
            <p className='font-medium'>Người nhận: {orderData.receiver.name}</p>
            <p>SĐT: {orderData.receiver.phone}</p>
            <p className='text-sm text-gray-600'>
              {orderData.receiver.address}
            </p>
          </div>
          <div className='text-right'>
            <span className='text-3xl font-bold'>419</span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className='grid grid-cols-2 gap-4 text-sm border-b pb-4'>
        <div>
          <p>Order ID: {orderData.orderDetails.id}</p>
          <p>In transit by: {orderData.orderDetails.transitDate}</p>
        </div>
        <div className='text-right'>
          <p>Thời gian đặt hàng: {orderData.orderDetails.date}</p>
          <p>Trọng lượng tính phí: {orderData.orderDetails.weight}</p>
        </div>
      </div>

      {/* Products Table */}
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2'>Tên Sản Phẩm</th>
            <th className='text-left py-2'>Mã SP</th>
            <th className='text-center py-2'>SL</th>
            <th className='text-right py-2'>Giá</th>
          </tr>
        </thead>
        <tbody>
          {orderData.products.map((product, index) => (
            <tr key={index} className='border-b'>
              <td className='py-2'>{product.name}</td>
              <td>{product.code}</td>
              <td className='text-center'>{product.quantity}</td>
              <td className='text-right'>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Phí vận chuyển</span>
          <span>{orderData.shipping}</span>
        </div>
        <div className='flex justify-between font-bold'>
          <span>Tổng tiền</span>
          <span>{orderData.total}</span>
        </div>
      </div>

      {/* Footer */}
      <div className='flex justify-between items-center pt-4 border-t'>
        <img
          src='https://www.saokim.com.vn/blog/wp-content/uploads/2022/04/logo-moi-cua-starbucks.jpg'
          alt='Company Logo'
          width={60}
          height={30}
          className='object-contain'
        />
        <div className='w-32'>
          <QRCode
            value={orderData.orderNumber}
            size={128}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </Card>
  )
}
