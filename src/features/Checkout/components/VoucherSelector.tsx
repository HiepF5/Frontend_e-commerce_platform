import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Radio,
  CircularProgress
} from '@mui/material'
import {
  useListDiscountVoucherMutation,
  useListShippingVoucherMutation,
  useListShopVoucherMutation
} from '@features/Voucher/api/voucherApi'
import { Voucher } from '@features/Voucher/types/voucher'
import { formatCurrency } from '@shared/utils/formatPrice'
import { ShopBill } from '../types/checkout.interface'

interface VoucherSelectorProps {
  open: boolean
  onClose: () => void
  onSelect: (voucher: Voucher | null, type: 'DISCOUNT' | 'SHIPPING' | 'SHOP', shopCode?: string) => void
  totalAmount: number
  shopBills: ShopBill[]
  selectedVouchers: {
    discount: Voucher | null
    shipping: Voucher | null
    shop: { [shopCode: string]: Voucher | null }
  }
  activeShop: string | null
  initialTab: 'DISCOUNT' | 'SHIPPING' | 'SHOP'
}

export const VoucherSelector = ({
  open,
  onClose,
  onSelect,
  totalAmount,
  shopBills,
  selectedVouchers,
  activeShop,
  initialTab
}: VoucherSelectorProps) => {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedShop, setSelectedShop] = useState<string>('')
  const [searchCode, setSearchCode] = useState('')
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(false)

  const [getDiscountVouchers] = useListDiscountVoucherMutation()
  const [getShippingVouchers] = useListShippingVoucherMutation()
  const [getShopVouchers] = useListShopVoucherMutation()

  useEffect(() => {
    if (open && activeTab === 'SHOP' && !selectedShop && shopBills.length > 0) {
      setSelectedShop(shopBills[0].shopCode)
    }
  }, [open, activeTab, shopBills])

  useEffect(() => {
    if (open) {
      loadVouchers()
    }
  }, [open, activeTab, searchCode, selectedShop])

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab)
    }
  }, [open, initialTab])

  const loadVouchers = async () => {
    setLoading(true)
    try {
      const request = {
        voucherCode: searchCode || null,
        totalAmount,
        pageNumber: 1,
        pageSize: 10
      }
      debugger

      let response
      switch (activeTab) {
        case 'DISCOUNT':
          response = await getDiscountVouchers(request).unwrap()
          break
        case 'SHIPPING':
          response = await getShippingVouchers(request).unwrap()
          break
        case 'SHOP':
          if (selectedShop) {
            response = await getShopVouchers({
              ...request,
              shopCode: selectedShop
            }).unwrap()
          }
          break
      }
      setVouchers(response?.data?.data || [])
    } catch (error) {
      console.error('Error loading vouchers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVoucherSelect = (voucher: Voucher) => {
    onSelect(voucher, activeTab, activeTab === 'SHOP' ? selectedShop : undefined)
  }

  const renderVoucherDescription = (voucher: Voucher) => {
    const descriptions = voucher.description.split('\n')
    return (
      <Box>
        <Typography variant="subtitle1" color="primary">
          {voucher.title}
        </Typography>
        {descriptions.map((desc, index) => (
          <Typography 
            key={index} 
            variant="body2" 
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            • {desc}
          </Typography>
        ))}
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            HSD: {new Date(voucher.expiredAt).toLocaleDateString('vi-VN')}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Còn lại: {voucher.remainingCount}/{voucher.voucherCount}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chọn Voucher</DialogTitle>
      <DialogContent>
        {!activeShop ? (
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Giảm giá" value="DISCOUNT" />
            <Tab label="Miễn phí vận chuyển" value="SHIPPING" />
          </Tabs>
        ) : (
          <Typography variant="h6" gutterBottom>
            Voucher của {shopBills.find(shop => shop.shopCode === activeShop)?.shopName}
          </Typography>
        )}

        <TextField
          fullWidth
          placeholder="Nhập mã voucher"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {vouchers.map((voucher) => (
              <Card 
                key={voucher.voucherCode} 
                sx={{ 
                  mb: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 1
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start'
                  }}>
                    {renderVoucherDescription(voucher)}
                    <Box sx={{ ml: 2 }}>
                      <Radio
                        checked={
                          activeTab === 'SHOP'
                            ? selectedVouchers.shop[selectedShop]?.voucherCode === voucher.voucherCode
                            : selectedVouchers[activeTab.toLowerCase() as 'discount' | 'shipping']?.voucherCode === voucher.voucherCode
                        }
                        onChange={() => handleVoucherSelect(voucher)}
                      />
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          display: 'block',
                          textAlign: 'center',
                          mt: 1
                        }}
                      >
                        {voucher.status === 'ENABLE' ? 'Có thể dùng' : 'Hết hạn'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  )
} 