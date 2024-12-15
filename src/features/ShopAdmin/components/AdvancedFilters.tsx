import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Collapse,
  Grid
} from '@mui/material'
import { FilterList as FilterIcon } from '@mui/icons-material'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface FilterValues {
  search: string
  status: string
  startDate: Date | null
  endDate: Date | null
  minAmount: number
  maxAmount: number
}

interface AdvancedFiltersProps {
  filters: FilterValues
  onFilterChange: (filters: FilterValues) => void
}

export const AdvancedFilters = ({
  filters,
  onFilterChange
}: AdvancedFiltersProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false)

  const handleAmountChange = (
    _event: Event,
    newValue: number | number[]
  ): void => {
    if (Array.isArray(newValue)) {
      onFilterChange({
        ...filters,
        minAmount: newValue[0],
        maxAmount: newValue[1]
      })
    }
  }

  const handleReset = (): void => {
    onFilterChange({
      search: '',
      status: '',
      startDate: null,
      endDate: null,
      minAmount: 0,
      maxAmount: 10000
    })
  }

  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant='h6'>Filters</Typography>
        <Button
          startIcon={<FilterIcon />}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label='Search'
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label='Status'
                onChange={(e) =>
                  onFilterChange({ ...filters, status: e.target.value })
                }
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='processing'>Processing</MenuItem>
                <MenuItem value='shipped'>Shipped</MenuItem>
                <MenuItem value='delivered'>Delivered</MenuItem>
                <MenuItem value='cancelled'>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              selected={filters.startDate}
              onChange={(date) =>
                onFilterChange({ ...filters, startDate: date })
              }
              customInput={<TextField fullWidth label='Start Date' />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => onFilterChange({ ...filters, endDate: date })}
              customInput={<TextField fullWidth label='End Date' />}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Order Amount Range</Typography>
            <Slider
              value={[filters.minAmount, filters.maxAmount]}
              onChange={handleAmountChange}
              valueLabelDisplay='auto'
              min={0}
              max={10000}
              step={100}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='body2'>${filters.minAmount}</Typography>
              <Typography variant='body2'>${filters.maxAmount}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleReset}>Reset Filters</Button>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  )
}
