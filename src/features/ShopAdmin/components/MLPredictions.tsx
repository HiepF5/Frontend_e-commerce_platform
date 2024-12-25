import { useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material'
import Plot from 'react-plotly.js'
import { HyperparameterTuning } from './HyperparameterTuning'

interface MLPredictionsProps {
  data: any[]
  valueKey: string
  onPredictionComplete: (predictions: number[]) => void
}

export const MLPredictions = ({
  data,
  valueKey,
  onPredictionComplete,
}: MLPredictionsProps): JSX.Element => {
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [predictionDays, setPredictionDays] = useState(7)
  const [modelType, setModelType] = useState<'lstm' | 'dense'>('lstm')
  const [confidence, setConfidence] = useState<[number, number][]>([])

  const preprocessData = (data: any[]) => {
    const values = data.map(item => item[valueKey])
    const tensorData = tf.tensor2d(values, [values.length, 1])
    const normalized = tensorData.sub(tensorData.min())
                                .div(tensorData.max().sub(tensorData.min()))
    return {
      tensor: normalized,
      min: tensorData.min().dataSync()[0],
      max: tensorData.max().dataSync()[0],
    }
  }

  const createSequences = (data: tf.Tensor2D, lookback: number) => {
    const X = []
    const y = []
    const dataArray = data.arraySync() as number[][]

    for (let i = lookback; i < dataArray.length; i++) {
      X.push(dataArray.slice(i - lookback, i))
      y.push(dataArray[i])
    }

    return {
      X: tf.tensor3d(X, [X.length, lookback, 1]),
      y: tf.tensor2d(y, [y.length, 1]),
    }
  }

  const createModel = async () => {
    setLoading(true)
    setError(null)

    try {
      const { tensor, min, max } = preprocessData(data)
      const lookback = 10
      const { X, y } = createSequences(tensor as tf.Tensor2D, lookback)

      const model = tf.sequential()

      if (modelType === 'lstm') {
        model.add(tf.layers.lstm({
          units: 50,
          returnSequences: false,
          inputShape: [lookback, 1],
        }))
      } else {
        model.add(tf.layers.dense({
          units: 50,
          activation: 'relu',
          inputShape: [lookback],
        }))
      }

      model.add(tf.layers.dense({ units: 1 }))
      model.compile({ optimizer: 'adam', loss: 'meanSquaredError' })

      await model.fit(X, y, {
        epochs: 50,
        batchSize: 32,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss}`)
          },
        },
      })

      setModel(model)

      // Generate predictions
      const lastSequence = tensor.slice([tensor.shape[0] - lookback, 0], [lookback, 1])
      const predictions = []
      const confidenceIntervals: [number, number][] = []

      let currentInput = lastSequence

      for (let i = 0; i < predictionDays; i++) {
        const prediction = model.predict(currentInput.expandDims(0)) as tf.Tensor
        const predValue = prediction.dataSync()[0]
        predictions.push(predValue * (max - min) + min)

        // Calculate confidence intervals using Monte Carlo dropout
        const mcPredictions = []
        for (let j = 0; j < 100; j++) {
          const mcPred = model.predict(currentInput.expandDims(0)) as tf.Tensor
          mcPredictions.push(mcPred.dataSync()[0] * (max - min) + min)
        }

        const sorted = mcPredictions.sort((a, b) => a - b)
        confidenceIntervals.push([
          sorted[Math.floor(sorted.length * 0.025)],
          sorted[Math.floor(sorted.length * 0.975)],
        ])

        // Update input sequence for next prediction
        currentInput = tf.concat([
          currentInput.slice([1, 0]),
          prediction,
        ], 0)
      }

      setConfidence(confidenceIntervals)
      onPredictionComplete(predictions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const renderPlot = () => {
    if (!model || loading) return null

    const actualTrace: Partial<Plotly.Data> = {
      x: data.map((_, i) => i),
      y: data.map(item => item[valueKey]),
      type: 'scatter' as const,
      name: 'Actual',
    }

    const predictedTrace: Partial<Plotly.Data> = {
      x: data.map((_, i) => i + data.length),
      y: confidence.map(([lower, upper]) => (lower + upper) / 2),
      type: 'scatter' as const,
      name: 'Predicted',
      line: { dash: 'dot' },
    }

    const confidenceTrace: Partial<Plotly.Data> = {
      x: [...data.map((_, i) => i + data.length), ...data.map((_, i) => i + data.length).reverse()],
      y: [...confidence.map(([lower]) => lower), ...confidence.map(([_, upper]) => upper).reverse()],
      fill: 'toself',
      fillcolor: 'rgba(0,176,246,0.2)',
      line: { color: 'transparent' },
      name: '95% Confidence Interval',
      showlegend: true,
    }

    return (
      <Plot
        data={[actualTrace, predictedTrace, confidenceTrace]}
        layout={{
          title: 'Time Series Prediction',
          xaxis: { title: 'Time' },
          yaxis: { title: valueKey },
          hovermode: 'closest',
        }}
        style={{ width: '100%', height: '400px' }}
      />
    )
  }

  const handleTuning = async (params: Record<string, number | string>) => {
    const { tensor } = preprocessData(data)
    const lookback = 10
    const { X, y } = createSequences(tensor as tf.Tensor2D, lookback)

    const model = tf.sequential()
    if (modelType === 'lstm') {
      model.add(tf.layers.lstm({
        units: params.hiddenUnits as number,
        returnSequences: false,
        inputShape: [lookback, 1],
      }))
    } else {
      model.add(tf.layers.dense({
        units: params.hiddenUnits as number,
        activation: 'relu',
        inputShape: [lookback],
      }))
    }
    model.add(tf.layers.dense({ units: 1 }))

    model.compile({
      optimizer: (tf.train[params.optimizer as keyof typeof tf.train] as any)(params.learningRate as number),
      loss: 'meanSquaredError',
    })

    const history = await model.fit(X, y, {
      epochs: params.epochs as number,
      batchSize: params.batchSize as number,
      validationSplit: 0.2,
      verbose: 0,
    })

    const trainScore = 1 - (history.history.loss[history.history.loss.length - 1] as number)
    const validationScore = 1 - (history.history.val_loss[history.history.val_loss.length - 1] as number)

    return {
      score: trainScore,
      validationScore: validationScore,
    }
  }

  const handleSaveModel = (params: Record<string, number | string>) => {
    // Implement model saving logic
    console.log('Saving model with params:', params)
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Machine Learning Predictions
      </Typography>

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Model Type</InputLabel>
          <Select
            value={modelType}
            onChange={(e) => setModelType(e.target.value as 'lstm' | 'dense')}
            label="Model Type"
          >
            <MenuItem value="lstm">LSTM (Long Short-Term Memory)</MenuItem>
            <MenuItem value="dense">Dense Neural Network</MenuItem>
          </Select>
        </FormControl>

        <Typography gutterBottom>Prediction Days</Typography>
        <Slider
          value={predictionDays}
          onChange={(_, value) => setPredictionDays(value as number)}
          min={1}
          max={30}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Button
        variant="contained"
        onClick={createModel}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Predictions'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {renderPlot()}

      <HyperparameterTuning
        onTune={handleTuning}
        onSaveModel={handleSaveModel}
      />
    </Paper>
  )
} 