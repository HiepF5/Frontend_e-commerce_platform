import { useState } from 'react'
import {
  Box,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Collapse,
  Typography
} from '@mui/material'
import { FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface VoucherFiltersProps {
  onSearch: (value: string) => void
  onPageChange: (page: number) => void
  onFilterChange?: (filters: any) => void
}

export const VoucherFilters = ({ 
  onSearch, 
  onPageChange,
  onFilterChange 
}: VoucherFiltersProps) => {
  const [expanded, setExpanded] = useState(false)
  const [filters, setFilters] = useState({
    voucherCode: null as string | null,
    status: null as string | null,
    startSt: null as Date | null,
    startEd: null as Date | null,
    type: null as string | null,
    discountType: null as string | null
  })

  const handleFilterChange = (field: string, value: any) => {
    const newValue = value === '' ? null : value
    const newFilters = {
      ...filters,
      [field]: newValue
    }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
    onPageChange(1) // Reset to first page when filters change
  }

  const handleReset = () => {
    setFilters({
      voucherCode: null,
      status: null,
      startSt: null,
      startEd: null,
      type: null,
      discountType: null
    })
    onFilterChange?.({})
    onPageChange(1)
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon />
          <Typography variant='h6'>Filters</Typography>
        </Box>
        <Box>
          <Button
            variant='outlined'
            onClick={() => setExpanded(!expanded)}
            startIcon={<FilterIcon />}
          >
            {expanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <IconButton onClick={handleReset}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label='Search'
              value={filters.voucherCode}
              onChange={(e) => {
                handleFilterChange('voucherCode', e.target.value)
                onSearch(e.target.value)
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='ENABLE'>ENABLE</MenuItem>
                <MenuItem value='DISABLE'>DISABLE</MenuItem>
                <MenuItem value='EXPIRED'>EXPIRED</MenuItem>
                <MenuItem value='WAIT'>WAIT</MenuItem>
                <MenuItem value='DELETED'>DELETED</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='DISCOUNT'>Discount</MenuItem>
                <MenuItem value='SHIPPING'>Shipping</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Discount Type</InputLabel>
              <Select
                value={filters.discountType}
                onChange={(e) =>
                  handleFilterChange('discountType', e.target.value)
                }
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='PERCENT'>Percentage</MenuItem>
                <MenuItem value='AMOUNT'>Fixed Amount</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <DatePicker
              selected={filters.startSt}
              onChange={(date) => handleFilterChange('startDate', date)}
              placeholderText='Start Date'
              dateFormat='yyyy-MM-dd'
              isClearable
              customInput={<TextField fullWidth label='Start Date' />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DatePicker
              selected={filters.startEd}
              onChange={(date) => handleFilterChange('endDate', date)}
              placeholderText='End Date'
              dateFormat='yyyy-MM-dd'
              isClearable
              customInput={<TextField fullWidth label='End Date' />}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  )
} 