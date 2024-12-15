import { useState } from 'react'
import regression from 'regression'
import * as ss from 'simple-statistics'
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import {
  ExpandMore,
  Analytics,
  ShowChart,
  Download,
} from '@mui/icons-material'
import { exportAnalysisResults } from '../utils/exportUtils'
import { MLPredictions } from './MLPredictions'

interface AdvancedAnalysisProps {
  data: any[]
  valueKey: string
  onHighlight: (ranges: Array<{ start: number; end: number; color: string }>) => void
}

export const AdvancedAnalysis = ({
  data,
  valueKey,
  onHighlight,
}: AdvancedAnalysisProps): JSX.Element => {
  const [results, setResults] = useState<any[]>([])
  const [forecastDays, setForecastDays] = useState(7)
  const [mlPredictions, setMLPredictions] = useState<number[]>([])

  const performSeasonalAnalysis = () => {
    const values = data.map(item => item[valueKey])
    const seasonalPeriod = 7 // Weekly seasonality
    
    // Calculate seasonal indices
    const seasonalIndices = []
    for (let i = 0; i < seasonalPeriod; i++) {
      const seasonValues = values.filter((_, index) => index % seasonalPeriod === i)
      const seasonAvg = ss.mean(seasonValues)
      seasonalIndices.push(seasonAvg)
    }

    // Normalize seasonal indices
    const avgIndex = ss.mean(seasonalIndices)
    const normalizedIndices = seasonalIndices.map(index => index / avgIndex)

    setResults([
      ...results,
      {
        type: 'Seasonal Analysis',
        data: normalizedIndices,
        description: 'Weekly seasonal patterns',
      },
    ])
  }

  const performRegressionAnalysis = () => {
    const points: [number, number][] = data.map((item, index) => [index, item[valueKey]])
    const result = regression.linear(points)
    
    // Calculate forecast
    const forecast = Array.from({ length: forecastDays }, (_, i) => {
      const nextIndex = points.length + i
      return result.predict(nextIndex)
    })

    setResults([
      ...results,
      {
        type: 'Regression Analysis',
        data: {
          equation: result.equation,
          r2: result.r2,
          forecast,
        },
        description: `Linear trend with R² = ${result.r2.toFixed(4)}`,
      },
    ])

    // Highlight trend
    onHighlight([{
      start: 0,
      end: data.length - 1,
      color: result.equation[0] > 0 ? '#4CAF50' : '#F44336',
    }])
  }

  const performVolatilityAnalysis = () => {
    const values = data.map(item => item[valueKey])
    const returns = values.slice(1).map((value, i) => 
      (value - values[i]) / values[i]
    )
    
    const volatility = ss.standardDeviation(returns) * Math.sqrt(252) // Annualized
    const highVolPeriods = returns.map((ret, i) => ({
      index: i,
      volatility: Math.abs(ret),
    })).filter(period => period.volatility > volatility * 2)

    setResults([
      ...results,
      {
        type: 'Volatility Analysis',
        data: {
          annualizedVolatility: volatility,
          highVolatilityPeriods: highVolPeriods,
        },
        description: `Annualized volatility: ${(volatility * 100).toFixed(2)}%`,
      },
    ])

    // Highlight high volatility periods
    onHighlight(
      highVolPeriods.map(period => ({
        start: period.index,
        end: period.index + 1,
        color: '#FF9800',
      }))
    )
  }

  const exportResults = () => {
    exportAnalysisResults(results, 'analysis_results')
  }

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Advanced Analysis</Typography>
        <Button
          startIcon={<Download />}
          onClick={exportResults}
          disabled={results.length === 0}
        >
          Export Results
        </Button>
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Seasonal Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="contained"
            startIcon={<Analytics />}
            onClick={performSeasonalAnalysis}
          >
            Analyze Seasonality
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Regression & Forecast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              type="number"
              label="Forecast Days"
              value={forecastDays}
              onChange={(e) => setForecastDays(Number(e.target.value))}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<ShowChart />}
              onClick={performRegressionAnalysis}
            >
              Analyze Trend
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Volatility Analysis</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="contained"
            startIcon={<Analytics />}
            onClick={performVolatilityAnalysis}
          >
            Analyze Volatility
          </Button>
        </AccordionDetails>
      </Accordion>

      {results.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Analysis Results
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Analysis Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.type}</TableCell>
                  <TableCell>{result.description}</TableCell>
                  <TableCell>
                    {result.type === 'Regression Analysis' && (
                      <Chip
                        label={`Forecast: ${result.data.forecast[0][1].toFixed(2)}`}
                        color="primary"
                        size="small"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <MLPredictions
        data={data}
        valueKey={valueKey}
        onPredictionComplete={(predictions) => {
          setMLPredictions(predictions)
          setResults([
            ...results,
            {
              type: 'ML Prediction',
              data: predictions,
              description: `${predictions.length}-day forecast using machine learning`,
            },
          ])
        }}
      />
    </Paper>
  )
} 