import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  Tooltip
} from '@mui/material'
import {
  LocalOffer as VoucherIcon,
  AccessTime as TimeIcon,
  Info as InfoIcon
} from '@mui/icons-material'
import { Voucher } from '../types/voucher'
import { formatDate } from '@shared/utils/formatDate'

interface VoucherCardProps {
  voucher: Voucher
  onUse?: (voucherCode: string) => void
}

export const VoucherCard = ({ voucher, onUse }: VoucherCardProps): JSX.Element => {
  const isExpired = new Date(voucher.expiredAt) < new Date()
  const isDisabled = voucher.status === 'DISABLE' || isExpired

  const getDiscountText = () => {
    if (voucher.type === 'SHIPPING') {
      return `Free shipping up to ₫${voucher.maxShippingDiscount?.toLocaleString()}`
    }
    
    if (voucher.discountType === 'PERCENT') {
      return `${voucher.discountValue}% off up to ₫${voucher.maxDiscountValue?.toLocaleString()}`
    }
    
    return `₫${(voucher.discountValue ?? 0).toLocaleString()} off`
  }

  const getStatusColor = () => {
    if (isExpired) return 'error'
    if (voucher.status === 'DISABLE') return 'error'
    if (voucher.remainingCount === 0) return 'warning'
    return 'success'
  }

  const getStatusText = () => {
    if (isExpired) return 'Expired'
    if (voucher.status === 'DISABLE') return 'Disabled'
    if (voucher.remainingCount === 0) return 'Out of stock'
    return 'Active'
  }

  return (
    <Card 
      sx={{
        display: 'flex',
        height: '100%',
        opacity: isDisabled ? 0.7 : 1,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '10%',
          top: 0,
          width: '80%',
          height: '1px',
          borderTop: '2px dashed #ddd'
        }
      }}
    >
      <Box 
        sx={{ 
          width: 120,
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 2,
          position: 'relative'
        }}
      >
        <VoucherIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6" align="center">
          {voucher.type === 'SHIPPING' ? 'FREE SHIP' : 'DISCOUNT'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" component="div">
              {voucher.title}
            </Typography>
            <Chip
              size="small"
              color={getStatusColor()}
              label={getStatusText()}
            />
          </Box>

          <Typography variant="body1" color="primary" gutterBottom>
            {getDiscountText()}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Valid until: {formatDate(voucher.expiredAt)}
            </Typography>
          </Box>

          {voucher.minTotalOrder > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Min. order: ₫{voucher.minTotalOrder.toLocaleString()}
              </Typography>
            </Box>
          )}
        </CardContent>

        <Divider />

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              border: '1px dashed',
              borderColor: 'primary.main',
              px: 1,
              py: 0.5,
              borderRadius: 1
            }}
          >
            {voucher.voucherCode}
          </Typography>

          <Tooltip title={isDisabled ? getStatusText() : ''}>
            <span>
              <Button
                variant="contained"
                size="small"
                disabled={isDisabled}
                onClick={() => onUse?.(voucher.voucherCode)}
              >
                Use Now
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  )
} 