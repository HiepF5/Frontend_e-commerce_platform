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
    search: '',
    status: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    type: '',
    discountType: ''
  })

  const handleFilterChange = (field: string, value: any) => {
    const newFilters = {
      ...filters,
      [field]: value
    }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
    onPageChange(1) // Reset to first page when filters change
  }

  const handleReset = () => {
    setFilters({
      search: '',
      status: '',
      startDate: null,
      endDate: null,
      type: '',
      discountType: ''
    })
    onFilterChange?.({})
    onPageChange(1)
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
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
              label="Search"
              value={filters.search}
              onChange={(e) => {
                handleFilterChange('search', e.target.value)
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
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ENABLE">Active</MenuItem>
                <MenuItem value="DISABLE">Inactive</MenuItem>
                <MenuItem value="EXPIRED">Expired</MenuItem>
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
                <MenuItem value="">All</MenuItem>
                <MenuItem value="DISCOUNT">Discount</MenuItem>
                <MenuItem value="SHIPPING">Shipping</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Discount Type</InputLabel>
              <Select
                value={filters.discountType}
                onChange={(e) => handleFilterChange('discountType', e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="PERCENT">Percentage</MenuItem>
                <MenuItem value="AMOUNT">Fixed Amount</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => handleFilterChange('startDate', date)}
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
              isClearable
              customInput={
                <TextField fullWidth label="Start Date" />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => handleFilterChange('endDate', date)}
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
              isClearable
              customInput={
                <TextField fullWidth label="End Date" />
              }
            />
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  )
} 