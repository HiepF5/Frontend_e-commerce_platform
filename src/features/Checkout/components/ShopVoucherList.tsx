import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Card,
  CardContent,
  Radio,
} from '@mui/material'
import { useListShopVoucherMutation } from '@features/Voucher/api/voucherApi'
import { Voucher } from '@features/Voucher/types/voucher'
import { formatCurrency } from '@shared/utils/formatPrice'

interface ShopVoucherListProps {
  shopCode: string
  shopName: string
  selectedVoucher: Voucher | null
  onSelectVoucher: (voucher: Voucher | null) => void
  totalAmount: number
}

export const ShopVoucherList = ({
  shopCode,
  shopName,
  selectedVoucher,
  onSelectVoucher,
  totalAmount
}: ShopVoucherListProps) => {
  const [searchCode, setSearchCode] = useState('')
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [listShopVoucher] = useListShopVoucherMutation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadVouchers()
  }, [shopCode, searchCode])

  const loadVouchers = async () => {
    setLoading(true)
    try {
      const response = await listShopVoucher({
        shopCode: shopCode,
        voucherCode: searchCode || null,
        totalAmount: totalAmount,
        pageNumber: 1,
        pageSize: 10
      }).unwrap()
      setVouchers(response.data.data)
    } catch (error) {
      console.error('Failed to load shop vouchers:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ my: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
      <Typography variant="subtitle1" gutterBottom>
        Voucher của {shopName}
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Nhập mã voucher"
        value={searchCode}
        onChange={(e) => setSearchCode(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
          {vouchers.map((voucher) => (
            <Card 
              key={voucher.voucherCode}
              variant="outlined"
              sx={{ mb: 1 }}
            >
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <Box>
                    <Typography variant="subtitle2">
                      {voucher.voucherCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Giảm {formatCurrency(voucher.discountValue ?? 0)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Đơn tối thiểu {formatCurrency(voucher.minTotalOrder)}
                    </Typography>
                  </Box>
                  <Radio
                    checked={selectedVoucher?.voucherCode === voucher.voucherCode}
                    onChange={() => onSelectVoucher(voucher)}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
} 