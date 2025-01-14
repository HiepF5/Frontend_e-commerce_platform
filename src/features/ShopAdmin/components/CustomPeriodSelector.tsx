import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Typography,
  Alert
} from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Period {
  startDate: Date | null
  endDate: Date | null
}

interface CustomPeriodSelectorProps {
  open: boolean
  onClose: () => void
  onApply: (periods: { current: Period; previous: Period }) => void
}

export const CustomPeriodSelector = ({
  open,
  onClose,
  onApply
}: CustomPeriodSelectorProps): JSX.Element => {
  const [currentPeriod, setCurrentPeriod] = useState<Period>({
    startDate: null,
    endDate: null
  })
  const [previousPeriod, setPreviousPeriod] = useState<Period>({
    startDate: null,
    endDate: null
  })
  const [error, setError] = useState<string>('')

  const validatePeriods = (): boolean => {
    if (
      !currentPeriod.startDate ||
      !currentPeriod.endDate ||
      !previousPeriod.startDate ||
      !previousPeriod.endDate
    ) {
      setError('Please select all dates')
      return false
    }

    if (
      currentPeriod.startDate > currentPeriod.endDate ||
      previousPeriod.startDate > previousPeriod.endDate
    ) {
      setError('Start date must be before end date')
      return false
    }

    setError('')
    return true
  }

  const handleApply = (): void => {
    if (validatePeriods()) {
      onApply({ current: currentPeriod, previous: previousPeriod })
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Custom Period Comparison</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, mt: 2 }}>
          <Typography variant='subtitle1' gutterBottom>
            Current Period
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              selected={currentPeriod.startDate}
              onChange={(date) =>
                setCurrentPeriod({ ...currentPeriod, startDate: date })
              }
              customInput={<TextField fullWidth label='Start Date' />}
            />
            <DatePicker
              selected={currentPeriod.endDate}
              onChange={(date) =>
                setCurrentPeriod({ ...currentPeriod, endDate: date })
              }
              customInput={<TextField fullWidth label='End Date' />}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle1' gutterBottom>
            Previous Period
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              selected={previousPeriod.startDate}
              onChange={(date) =>
                setPreviousPeriod({ ...previousPeriod, startDate: date })
              }
              customInput={<TextField fullWidth label='Start Date' />}
            />
            <DatePicker
              selected={previousPeriod.endDate}
              onChange={(date) =>
                setPreviousPeriod({ ...previousPeriod, endDate: date })
              }
              customInput={<TextField fullWidth label='End Date' />}
            />
          </Box>
        </Box>

        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={handleApply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}
