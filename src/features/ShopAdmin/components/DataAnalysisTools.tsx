import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  ExpandMore,
  TrendingUp,
  Functions,
  Timeline,
} from '@mui/icons-material'
import { useState } from 'react'
import { AdvancedAnalysis } from './AdvancedAnalysis'

interface AnalysisResult {
  type: string
  value: number
  description: string
}

interface DataAnalysisToolsProps {
  data: any[]
  valueKey: string
  onHighlight: (ranges: Array<{ start: number; end: number; color: string }>) => void
}

export const DataAnalysisTools = ({
  data,
  valueKey,
  onHighlight,
}: DataAnalysisToolsProps): JSX.Element => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [movingAverageWindow, setMovingAverageWindow] = useState(7)
  const [outlierThreshold, setOutlierThreshold] = useState(2)

  const calculateMovingAverage = () => {
    const results = []
    for (let i = movingAverageWindow - 1; i < data.length; i++) {
      const window = data.slice(i - movingAverageWindow + 1, i + 1)
      const average = window.reduce((sum, item) => sum + item[valueKey], 0) / movingAverageWindow
      results.push({
        type: 'Moving Average',
        value: average,
        description: `${movingAverageWindow}-day moving average: ${average.toFixed(2)}`,
      })
    }
    setAnalysisResults(results)
  }

  const detectOutliers = () => {
    const values = data.map(item => item[valueKey])
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const stdDev = Math.sqrt(
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    )

    const outliers = data.filter(item => 
      Math.abs(item[valueKey] - mean) > outlierThreshold * stdDev
    ).map((item, index) => ({
      type: 'Outlier',
      value: item[valueKey],
      description: `Outlier detected: ${item[valueKey]} (${outlierThreshold} std devs from mean)`,
    }))

    setAnalysisResults(outliers)
    outliers.forEach((outlier, index) => {
      onHighlight([{
        start: data.findIndex(item => item[valueKey] === outlier.value),
        end: data.findIndex(item => item[valueKey] === outlier.value),
        color: '#FF4081',
      }])
    })
  }

  const findTrends = () => {
    const trends = []
    let trend = { direction: 'up', length: 1, startIndex: 0 }

    for (let i = 1; i < data.length; i++) {
      const current = data[i][valueKey]
      const previous = data[i - 1][valueKey]

      if (
        (trend.direction === 'up' && current > previous) ||
        (trend.direction === 'down' && current < previous)
      ) {
        trend.length++
      } else {
        if (trend.length >= 3) {
          trends.push({
            type: 'Trend',
            value: trend.length,
            description: `${trend.direction === 'up' ? 'Upward' : 'Downward'} trend for ${trend.length} days`,
          })
          onHighlight([{
            start: trend.startIndex,
            end: i - 1,
            color: trend.direction === 'up' ? '#4CAF50' : '#F44336',
          }])
        }
        trend = {
          direction: current > previous ? 'up' : 'down',
          length: 1,
          startIndex: i,
        }
      }
    }

    setAnalysisResults(trends)
  }

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Data Analysis Tools
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Moving Average Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              type="number"
              label="Window Size"
              value={movingAverageWindow}
              onChange={(e) => setMovingAverageWindow(Number(e.target.value))}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<Timeline />}
              onClick={calculateMovingAverage}
            >
              Calculate
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Outlier Detection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              type="number"
              label="Threshold (std devs)"
              value={outlierThreshold}
              onChange={(e) => setOutlierThreshold(Number(e.target.value))}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<Functions />}
              onClick={detectOutliers}
            >
              Detect
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Trend Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="contained"
            startIcon={<TrendingUp />}
            onClick={findTrends}
          >
            Find Trends
          </Button>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Analysis Results
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {analysisResults.map((result, index) => (
            <Chip
              key={index}
              label={result.description}
              color={
                result.type === 'Outlier'
                  ? 'error'
                  : result.type === 'Trend'
                  ? 'success'
                  : 'default'
              }
            />
          ))}
        </Box>
      </Box>

      <AdvancedAnalysis
        data={data}
        valueKey={valueKey}
        onHighlight={onHighlight}
      />
    </Paper>
  )
} 