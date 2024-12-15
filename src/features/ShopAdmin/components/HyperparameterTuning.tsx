import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from '@mui/material'
import { Tune, CompareArrows, Save } from '@mui/icons-material'
import Plot from 'react-plotly.js'

interface HyperParameter {
  name: string
  type: 'number' | 'categorical'
  range?: [number, number]
  step?: number
  options?: string[]
  value: number | string
}

interface TuningResult {
  params: Record<string, number | string>
  score: number
  validationScore: number
}

interface HyperparameterTuningProps {
  onTune: (params: Record<string, number | string>) => Promise<{
    score: number
    validationScore: number
  }>
  onSaveModel: (params: Record<string, number | string>) => void
}

export const HyperparameterTuning = ({
  onTune,
  onSaveModel,
}: HyperparameterTuningProps): JSX.Element => {
  const [parameters] = useState<HyperParameter[]>([
    {
      name: 'learningRate',
      type: 'number',
      range: [0.0001, 0.1],
      step: 0.0001,
      value: 0.001,
    },
    {
      name: 'epochs',
      type: 'number',
      range: [10, 200],
      step: 10,
      value: 50,
    },
    {
      name: 'batchSize',
      type: 'number',
      range: [16, 128],
      step: 16,
      value: 32,
    },
    {
      name: 'hiddenUnits',
      type: 'number',
      range: [10, 100],
      step: 10,
      value: 50,
    },
    {
      name: 'optimizer',
      type: 'categorical',
      options: ['adam', 'sgd', 'rmsprop'],
      value: 'adam',
    },
  ])

  const [tuningResults, setTuningResults] = useState<TuningResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentParams, setCurrentParams] = useState<Record<string, number | string>>(
    Object.fromEntries(parameters.map(p => [p.name, p.value]))
  )

  const handleParameterChange = (name: string, value: number | string) => {
    setCurrentParams(prev => ({ ...prev, [name]: value }))
  }

  const runTuning = async () => {
    setIsRunning(true)
    try {
      const result = await onTune(currentParams)
      setTuningResults(prev => [
        ...prev,
        {
          params: currentParams,
          ...result,
        },
      ])
    } finally {
      setIsRunning(false)
    }
  }

  const getBestParams = () => {
    if (tuningResults.length === 0) return null
    return tuningResults.reduce((best, current) => 
      current.validationScore > best.validationScore ? current : best
    )
  }

  const renderParamPlot = () => {
    if (tuningResults.length < 2) return null

    const traces: Partial<Plotly.Data>[] = parameters
      .filter(p => p.type === 'number')
      .map(param => ({
        x: tuningResults.map(r => r.params[param.name]),
        y: tuningResults.map(r => r.validationScore),
        mode: 'markers',
        type: 'scatter' as const,
        name: param.name,
      }))

    return (
      <Plot
        data={traces}
        layout={{
          title: 'Parameter Impact on Validation Score',
          xaxis: { title: 'Parameter Value' },
          yaxis: { title: 'Validation Score' },
          height: 300,
          showlegend: true,
        }}
      />
    )
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Hyperparameter Tuning
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            {parameters.map((param) => (
              <Box key={param.name} sx={{ mb: 2 }}>
                {param.type === 'number' ? (
                  <>
                    <Typography gutterBottom>
                      {param.name}: {currentParams[param.name]}
                    </Typography>
                    <Slider
                      value={currentParams[param.name] as number}
                      onChange={(_, value) => handleParameterChange(param.name, Array.isArray(value) ? value[0] : value)}
                      min={param.range?.[0]}
                      max={param.range?.[1]}
                      step={param.step}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel>{param.name}</InputLabel>
                    <Select
                      value={currentParams[param.name]}
                      onChange={(e) => handleParameterChange(param.name, e.target.value)}
                      label={param.name}
                    >
                      {param.options?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            ))}

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<Tune />}
                onClick={runTuning}
                disabled={isRunning}
              >
                {isRunning ? <CircularProgress size={24} /> : 'Run Tuning'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Save />}
                onClick={() => {
                  const bestParams = getBestParams()
                  if (bestParams) {
                    onSaveModel(bestParams.params)
                  }
                }}
                disabled={tuningResults.length === 0}
              >
                Save Best Model
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {renderParamPlot()}
        </Grid>
      </Grid>

      {tuningResults.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Tuning Results
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Parameters</TableCell>
                <TableCell align="right">Training Score</TableCell>
                <TableCell align="right">Validation Score</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tuningResults.map((result, index) => {
                const isBest = getBestParams() === result
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {Object.entries(result.params).map(([key, value]) => (
                          <Chip
                            key={key}
                            label={`${key}: ${value}`}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">{result.score.toFixed(4)}</TableCell>
                    <TableCell align="right">{result.validationScore.toFixed(4)}</TableCell>
                    <TableCell align="right">
                      {isBest && (
                        <Chip
                          label="Best"
                          color="success"
                          size="small"
                          icon={<CompareArrows />}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  )
} 