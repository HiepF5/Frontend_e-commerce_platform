import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Tooltip,
} from '@mui/material'
import {
  Timeline,
  Assessment,
  TrendingUp,
  ErrorOutline,
} from '@mui/icons-material'
import Plot from 'react-plotly.js'

interface MetricResult {
  metric: string
  value: number
  description: string
}

interface ModelMetricsProps {
  trainMetrics: MetricResult[]
  validationMetrics: MetricResult[]
  crossValidation: {
    fold: number
    trainScore: number
    validScore: number
  }[]
  trainingProgress: {
    epoch: number
    loss: number
    valLoss: number
  }[]
}

export const ModelMetrics = ({
  trainMetrics,
  validationMetrics,
  crossValidation,
  trainingProgress,
}: ModelMetricsProps): JSX.Element => {
  const renderMetricValue = (value: number) => {
    const formattedValue = value.toFixed(4)
    const color = value > 0.8 ? 'success.main' : value > 0.6 ? 'warning.main' : 'error.main'
    
    return (
      <Typography color={color} variant="body2">
        {formattedValue}
      </Typography>
    )
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Model Performance Metrics
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {/* Training Metrics */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Training Metrics
          </Typography>
          <Table size="small">
            <TableBody>
              {trainMetrics.map((metric) => (
                <TableRow key={metric.metric}>
                  <TableCell>
                    <Tooltip title={metric.description}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Assessment fontSize="small" />
                        {metric.metric}
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    {renderMetricValue(metric.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Validation Metrics */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Validation Metrics
          </Typography>
          <Table size="small">
            <TableBody>
              {validationMetrics.map((metric) => (
                <TableRow key={metric.metric}>
                  <TableCell>
                    <Tooltip title={metric.description}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUp fontSize="small" />
                        {metric.metric}
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    {renderMetricValue(metric.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      {/* Cross-Validation Results */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Cross-Validation Results
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fold</TableCell>
              <TableCell align="right">Training Score</TableCell>
              <TableCell align="right">Validation Score</TableCell>
              <TableCell align="right">Difference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crossValidation.map((fold) => {
              const difference = Math.abs(fold.trainScore - fold.validScore)
              const isOverfitting = difference > 0.1

              return (
                <TableRow key={fold.fold}>
                  <TableCell>{fold.fold}</TableCell>
                  <TableCell align="right">
                    {renderMetricValue(fold.trainScore)}
                  </TableCell>
                  <TableCell align="right">
                    {renderMetricValue(fold.validScore)}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      {difference.toFixed(4)}
                      {isOverfitting && (
                        <Tooltip title="Potential overfitting detected">
                          <ErrorOutline color="warning" fontSize="small" />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>

      {/* Training Progress */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Training Progress
        </Typography>
        <Box sx={{ height: 200 }}>
          <Plot
            data={[
              {
                y: trainingProgress.map((p) => p.loss),
                type: 'scatter',
                name: 'Training Loss',
                line: { shape: 'spline' },
              },
              {
                y: trainingProgress.map((p) => p.valLoss),
                type: 'scatter',
                name: 'Validation Loss',
                line: { shape: 'spline', dash: 'dot' },
              },
            ]}
            layout={{
              margin: { t: 0, r: 0, l: 30, b: 30 },
              showlegend: true,
              xaxis: { title: 'Epoch' },
              yaxis: { title: 'Loss' },
            }}
            config={{ responsive: true }}
          />
        </Box>
      </Box>
    </Paper>
  )
} 