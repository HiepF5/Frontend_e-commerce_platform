import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material'
import {
  ResponsiveContainer
} from 'recharts'
import { useState, useRef } from 'react'
import { CustomPeriodSelector } from './CustomPeriodSelector'
import { exportChartToPDF, exportChartDataToExcel } from '../utils/chartExport'
import { MoreVert as MoreIcon } from '@mui/icons-material'
import { ChartAnnotation } from './ChartAnnotation'
import { filterChartData, calculatePeriodMetrics } from '../utils/dataFilters'
import { InteractiveChart } from './InteractiveChart'
import { Annotation } from './ChartAnnotation'
import 'jspdf-autotable'

interface FilterOptions {
  [key: string]: any
}

interface PeriodComparisonProps {
  currentPeriodData: any[]
  previousPeriodData: any[]
  title: string
  dataKey: string
  valueKey: string
  periodOptions: Array<{
    value: string
    label: string
  }>
}

export const PeriodComparison = ({
  currentPeriodData,
  previousPeriodData,
  title,
  dataKey,
  valueKey,
  periodOptions
}: PeriodComparisonProps): JSX.Element => {
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0].value)
  const [customPeriodOpen, setCustomPeriodOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [filterOptions] = useState<FilterOptions>({})
  const [zoomedData, setZoomedData] = useState<any[] | null>(null)
  const [highlightRanges] = useState([
    {
      start: new Date('2024-01-01').getTime(),
      end: new Date('2024-01-15').getTime(),
      color: '#FF9800'
    },
    {
      start: new Date('2024-02-01').getTime(),
      end: new Date('2024-02-15').getTime(),
      color: '#4CAF50'
    }
  ])
  const [thresholds] = useState([
    { value: 2000, color: '#F44336', label: 'Upper Threshold' },
    { value: 1000, color: '#FFC107', label: 'Lower Threshold' }
  ])

  const calculateGrowth = () => {
    const currentTotal = currentPeriodData.reduce(
      (sum, item) => sum + item[valueKey],
      0
    )
    const previousTotal = previousPeriodData.reduce(
      (sum, item) => sum + item[valueKey],
      0
    )
    const growth = ((currentTotal - previousTotal) / previousTotal) * 100
    return growth.toFixed(2)
  }

  const handleExportPDF = async (): Promise<void> => {
    if (chartRef.current) {
      await exportChartToPDF(chartRef.current, title)
    }
    setMenuAnchorEl(null)
  }

  const handleExportExcel = (): void => {
    const columns = [
      { key: dataKey, header: 'Date' },
      { key: valueKey, header: 'Value' }
    ]

    exportChartDataToExcel(
      [...currentPeriodData, ...previousPeriodData],
      columns,
      title
    )
    setMenuAnchorEl(null)
  }

  const filteredCurrentData = filterChartData(
    currentPeriodData,
    filterOptions,
    dataKey,
    valueKey
  )

  const filteredPreviousData = filterChartData(
    previousPeriodData,
    filterOptions,
    dataKey,
    valueKey
  )

  const currentMetrics = calculatePeriodMetrics(filteredCurrentData, valueKey)
  const previousMetrics = calculatePeriodMetrics(filteredPreviousData, valueKey)

  const handleZoom = (startIndex: number, endIndex: number) => {
    setZoomedData(filteredCurrentData.slice(startIndex, endIndex + 1))
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='body2' color='text.secondary'>
            Growth: {calculateGrowth()}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ToggleButtonGroup
            value={selectedPeriod}
            exclusive
            onChange={(_, value) => value && setSelectedPeriod(value)}
            size='small'
          >
            {periodOptions.map((option) => (
              <ToggleButton key={option.value} value={option.value}>
                {option.label}
              </ToggleButton>
            ))}
            <ToggleButton
              value='custom'
              onClick={() => setCustomPeriodOpen(true)}
            >
              Custom
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton
            size='small'
            onClick={(e) => setMenuAnchorEl(e.currentTarget)}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Box>

      <Box ref={chartRef} sx={{ position: 'relative' }}>
        <ResponsiveContainer width='100%' height={300}>
          <InteractiveChart
            data={zoomedData || filteredCurrentData}
            comparisonData={filteredPreviousData}
            dataKey={dataKey}
            valueKey={valueKey}
            onZoom={handleZoom}
            highlightRanges={highlightRanges}
            thresholds={thresholds}
          />
        </ResponsiveContainer>
        <ChartAnnotation
          annotations={annotations}
          onAddAnnotation={(annotation) =>
            setAnnotations([...annotations, annotation])
          }
          onDeleteAnnotation={(id) =>
            setAnnotations(annotations.filter((a) => a.id !== id))
          }
          onEditAnnotation={(updated) =>
            setAnnotations(
              annotations.map((a) => (a.id === updated.id ? updated : a))
            )
          }
          chartWidth={700}
          chartHeight={300}
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Typography variant='body2'>
          Current Period Avg: ${currentMetrics.average.toFixed(2)}
        </Typography>
        <Typography variant='body2'>
          Previous Period Avg: ${previousMetrics.average.toFixed(2)}
        </Typography>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={handleExportPDF}>Export as PDF</MenuItem>
        <MenuItem onClick={handleExportExcel}>Export as Excel</MenuItem>
      </Menu>

      <CustomPeriodSelector
        open={customPeriodOpen}
        onClose={() => setCustomPeriodOpen(false)}
        onApply={(periods) => {
          // Handle custom period selection
          console.log('Custom periods:', periods)
          setCustomPeriodOpen(false)
        }}
      />
    </Paper>
  )
}
