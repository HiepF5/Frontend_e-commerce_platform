import { useState } from 'react'
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
import { DateTimePicker } from '@mui/x-date-pickers'
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
  discountValue: Yup.number()
    .required('Discount value is required')
    .when('discountType', {
      is: 'PERCENT',
      then: (schema) => schema.min(1).max(100)
    }),
  maxDiscountValue: Yup.number().when('discountType', {
    is: 'PERCENT',
    then: (schema) => schema.required('Max discount value is required for percentage discounts')
  }),
  minTotalOrder: Yup.number()
    .required('Minimum order value is required')
    .min(0),
  voucherCount: Yup.number()
    .required('Voucher count is required')
    .min(1),
  remainingCount: Yup.number()
    .required('Remaining count is required')
    .min(0)
    .max(Yup.ref('voucherCount'), 'Cannot exceed voucher count'),
  startedAt: Yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date must be in the future'),
  expiredAt: Yup.date()
    .required('Expiry date is required')
    .min(Yup.ref('startedAt'), 'Expiry date must be after start date')
})

interface VoucherFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: VoucherCreateRequest) => void
  initialData?: Voucher
  error?: string
}

export const VoucherForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
  error
}: VoucherFormProps) => {
  const formik = useFormik({
    initialValues: (initialData || {
      type: 'DISCOUNT',
      discountType: 'PERCENT',
      voucherCode: '',
      title: '',
      voucherCount: 1,
      remainingCount: 1,
      discountValue: 0,
      maxDiscountValue: 0,
      minTotalOrder: 0,
      startedAt: new Date().toISOString(),
      expiredAt: new Date().toISOString(),
      status: 'ENABLE'
    }) as VoucherCreateRequest,
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values)
    }
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Edit Voucher' : 'Create Voucher'}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="voucherCode"
                label="Voucher Code"
                value={formik.values.voucherCode}
                onChange={formik.handleChange}
                error={formik.touched.voucherCode && Boolean(formik.errors.voucherCode)}
                helperText={formik.touched.voucherCode && formik.errors.voucherCode}
                disabled={Boolean(initialData)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="title"
                label="Title"
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
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="DISCOUNT">Discount</MenuItem>
                  <MenuItem value="SHIPPING">Shipping</MenuItem>
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <FormHelperText>{formik.errors.type}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth 
                error={formik.touched.discountType && Boolean(formik.errors.discountType)}
              >
                <InputLabel>Discount Type</InputLabel>
                <Select
                  name="discountType"
                  value={formik.values.discountType}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="PERCENT">Percentage</MenuItem>
                  <MenuItem value="AMOUNT">Fixed Amount</MenuItem>
                </Select>
                {formik.touched.discountType && formik.errors.discountType && (
                  <FormHelperText>{formik.errors.discountType}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="discountValue"
                label={`Discount Value ${formik.values.discountType === 'PERCENT' ? '(%)' : '(₫)'}`}
                type="number"
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
                  name="maxDiscountValue"
                  label="Max Discount Value (₫)"
                  type="number"
                  value={formik.values.maxDiscountValue}
                  onChange={formik.handleChange}
                  error={formik.touched.maxDiscountValue && Boolean(formik.errors.maxDiscountValue)}
                  helperText={formik.touched.maxDiscountValue && formik.errors.maxDiscountValue}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="Start Date"
                value={new Date(formik.values.startedAt)}
                onChange={(date) => formik.setFieldValue('startedAt', date?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.startedAt && Boolean(formik.errors.startedAt),
                    helperText: formik.touched.startedAt && formik.errors.startedAt
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="Expiry Date"
                value={new Date(formik.values.expiredAt)}
                onChange={(date) => formik.setFieldValue('expiredAt', date?.toISOString())}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.expiredAt && Boolean(formik.errors.expiredAt),
                    helperText: formik.touched.expiredAt && formik.errors.expiredAt
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
} 