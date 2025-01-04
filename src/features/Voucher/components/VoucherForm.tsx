import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  Alert
} from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Voucher, VoucherCreateRequest } from '../types/voucher'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  voucherCode: Yup.string()
    .required('Voucher code is required')
    .matches(/^[A-Z0-9]+$/, 'Only uppercase letters and numbers are allowed')
    .min(6, 'Minimum 6 characters')
    .max(20, 'Maximum 20 characters'),
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters'),
  type: Yup.string().required('Type is required'),
  discountType: Yup.string().required('Discount type is required'),
  discountValue: Yup.number().when('type', {
    is: 'DISCOUNT',
    then: (schema) => schema
      .required('Discount value is required')
      .when('discountType', {
        is: 'PERCENT',
        then: (schema) => schema.min(1).max(100)
      })
  }),
  maxDiscountValue: Yup.number().when(['type', 'discountType'], {
    is: (type: string, discountType: string) => 
      type === 'DISCOUNT' && discountType === 'PERCENT',
    then: (schema) => schema.required('Max discount value is required for percentage discounts')
  }),
  shippingDiscount: Yup.number().when('type', {
    is: 'SHIPPING',
    then: (schema) => schema.required('Shipping discount value is required')
  }),
  maxShippingDiscount: Yup.number().when('type', {
    is: 'SHIPPING',
    then: (schema) => schema.required('Max shipping discount value is required')
  }),
  minTotalOrder: Yup.number()
    .required('Minimum order value is required')
    .min(0),
  voucherCount: Yup.number().required('Voucher count is required').min(1),
  remainingCount: Yup.number()
    .required('Remaining count is required')
    .min(0)
    .max(Yup.ref('voucherCount'), 'Cannot exceed voucher count'),
  status: Yup.string()
  .required('Status is required')
  .oneOf(['ENABLE', 'DISABLE'], 'Status must be ENABLE or DISABLE')
})
const checkMissingInputs = (values: VoucherCreateRequest) => {
  const errors: string[] = []

  if (!values.voucherCode) errors.push('Thiếu mã voucher (voucherCode).')
  if (!values.title) errors.push('Thiếu tiêu đề (title).')
  if (!values.discountValue)
    errors.push('Thiếu giá trị giảm giá (discountValue).')
  if (values.discountType === 'PERCENT' && !values.maxDiscountValue) {
    errors.push(
      'Thiếu giá trị giảm giá tối đa (maxDiscountValue) khi giảm giá theo phần trăm.'
    )
  }
  if (!values.minTotalOrder)
    errors.push('Thiếu giá trị đơn hàng tối thiểu (minTotalOrder).')
  if (!values.voucherCount || values.voucherCount < 1)
    errors.push('Số lượng voucher không hợp lệ (voucherCount).')
  if (!values.remainingCount || values.remainingCount < 0) {
    errors.push('Số lượng voucher còn lại không hợp lệ (remainingCount).')
  }
  if (!values.startedAt) errors.push('Thiếu ngày bắt đầu (startedAt).')
  if (!values.expiredAt) errors.push('Thiếu ngày kết thúc (expiredAt).')

  return errors
}
interface VoucherFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: VoucherCreateRequest) => void
  initialData?: Voucher
  error?: string
}
const defaultValues: VoucherCreateRequest = {
  type: 'DISCOUNT' as 'DISCOUNT' | 'SHIPPING',
  discountType: 'PERCENT' as 'PERCENT' | 'AMOUNT',
  voucherCode: '',
  title: '',
  voucherCount: 1,
  remainingCount: 1,
  discountValue: 0,
  maxDiscountValue: 0,
  minTotalOrder: 0,
  startedAt: new Date().toISOString().slice(0, 19),
  expiredAt: new Date().toISOString().slice(0, 19),
  status: 'ENABLE',
  shippingDiscount: 0,
  maxShippingDiscount: 0
}
export const VoucherForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
  error
}: VoucherFormProps) => {
  const formik = useFormik({
    initialValues: initialData || defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      const missingInputs = checkMissingInputs(values as VoucherCreateRequest)
      if (missingInputs.length > 0) {
        console.error('Errors in form submission:', missingInputs)
        return
      }
      await onSubmit(values as VoucherCreateRequest)
    }
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Voucher' : 'Create Voucher'}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {checkMissingInputs(formik.values as VoucherCreateRequest).length > 0 && (
            <Alert severity='warning' sx={{ mb: 2 }}>
              {checkMissingInputs(formik.values as VoucherCreateRequest).join(', ')}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name='voucherCode'
                label='Voucher Code'
                value={formik.values.voucherCode}
                onChange={formik.handleChange}
                error={
                  formik.touched.voucherCode &&
                  Boolean(formik.errors.voucherCode)
                }
                helperText={
                  formik.touched.voucherCode && formik.errors.voucherCode
                }
                disabled={Boolean(initialData)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name='title'
                label='Title'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  name='type'
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <MenuItem value='DISCOUNT'>Discount</MenuItem>
                  <MenuItem value='SHIPPING'>Shipping</MenuItem>
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <FormHelperText>{formik.errors.type}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {formik.values.type === 'DISCOUNT' && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    error={formik.touched.discountType && Boolean(formik.errors.discountType)}
                  >
                    <InputLabel>Discount Type</InputLabel>
                    <Select
                      name='discountType'
                      value={formik.values.discountType}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value='PERCENT'>Percentage</MenuItem>
                      <MenuItem value='AMOUNT'>Fixed Amount</MenuItem>
                    </Select>
                    {formik.touched.discountType && formik.errors.discountType && (
                      <FormHelperText>{formik.errors.discountType}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name='discountValue'
                    label={`Discount Value ${formik.values.discountType === 'PERCENT' ? '(%)' : '(₫)'}`}
                    type='number'
                    value={formik.values.discountValue}
                    onChange={formik.handleChange}
                    error={formik.touched.discountValue && Boolean(formik.errors.discountValue)}
                    helperText={formik.touched.discountValue && formik.errors.discountValue}
                  />
                </Grid>

                {formik.values.discountType === 'PERCENT' && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name='maxDiscountValue'
                      label='Max Discount Value (₫)'
                      type='number'
                      value={formik.values.maxDiscountValue}
                      onChange={formik.handleChange}
                      error={formik.touched.maxDiscountValue && Boolean(formik.errors.maxDiscountValue)}
                      helperText={formik.touched.maxDiscountValue && formik.errors.maxDiscountValue}
                    />
                  </Grid>
                )}
              </>
            )}

            {formik.values.type === 'SHIPPING' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name='shippingDiscount'
                    label='Shipping Discount (₫)'
                    type='number'
                    value={formik.values.shippingDiscount}
                    onChange={formik.handleChange}
                    error={formik.touched.shippingDiscount && Boolean(formik.errors.shippingDiscount)}
                    helperText={formik.touched.shippingDiscount && formik.errors.shippingDiscount}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name='maxShippingDiscount'
                    label='Max Shipping Discount (₫)'
                    type='number'
                    value={formik.values.maxShippingDiscount}
                    onChange={formik.handleChange}
                    error={formik.touched.maxShippingDiscount && Boolean(formik.errors.maxShippingDiscount)}
                    helperText={formik.touched.maxShippingDiscount && formik.errors.maxShippingDiscount}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={6}>
              <DatePicker
                selected={new Date(formik.values.startedAt)}
                onChange={(date) =>
                  formik.setFieldValue(
                    'startedAt',
                    date?.toISOString().slice(0, 19)
                  )
                }
                customInput={
                  <TextField
                    fullWidth
                    label='Start Date'
                    error={
                      formik.touched.startedAt &&
                      Boolean(formik.errors.startedAt)
                    }
                    helperText={
                      formik.touched.startedAt && formik.errors.startedAt
                    }
                  />
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                selected={new Date(formik.values.expiredAt)}
                onChange={(date) =>
                  formik.setFieldValue(
                    'expiredAt',
                    date?.toISOString().slice(0, 19)
                  )
                }
                customInput={
                  <TextField
                    fullWidth
                    label='Expiry Date'
                    error={
                      formik.touched.expiredAt &&
                      Boolean(formik.errors.expiredAt)
                    }
                    helperText={
                      formik.touched.expiredAt && formik.errors.expiredAt
                    }
                  />
                }
              />
            </Grid>
            {/* Voucher Count */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name='voucherCount'
                label='Voucher Count'
                type='number'
                value={formik.values.voucherCount}
                onChange={formik.handleChange}
                error={
                  formik.touched.voucherCount &&
                  Boolean(formik.errors.voucherCount)
                }
                helperText={
                  formik.touched.voucherCount && formik.errors.voucherCount
                }
              />
            </Grid>

            {/* Remaining Count */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name='remainingCount'
                label='Remaining Count'
                type='number'
                value={formik.values.remainingCount}
                onChange={formik.handleChange}
                error={
                  formik.touched.remainingCount &&
                  Boolean(formik.errors.remainingCount)
                }
                helperText={
                  formik.touched.remainingCount && formik.errors.remainingCount
                }
              />
            </Grid>

            {/* Minimum Total Order */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name='minTotalOrder'
                label='Minimum Total Order'
                type='number'
                value={formik.values.minTotalOrder}
                onChange={formik.handleChange}
                error={
                  formik.touched.minTotalOrder &&
                  Boolean(formik.errors.minTotalOrder)
                }
                helperText={
                  formik.touched.minTotalOrder && formik.errors.minTotalOrder
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                error={formik.touched.status && Boolean(formik.errors.status)}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  name='status'
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <MenuItem value='ENABLE'>Enable</MenuItem>
                  <MenuItem value='DISABLE'>Disable</MenuItem>
                  <MenuItem value='WAIT'>Wait</MenuItem>
                  <MenuItem value='EXPIRED'>Expired</MenuItem>
                  <MenuItem value='DELETED'>Deleted</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type='submit'
            variant='contained'
            disabled={formik.isSubmitting}
          >
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
