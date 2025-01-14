import {
  Box,
  Paper,
  Typography,
  Slider,
  FormControlLabel,
  Switch,
  TextField,
  // ColorPicker,
} from '@mui/material'
import { useState } from 'react'
import ColorPicker from './ColorPicker'
interface ChartCustomizationProps {
  onUpdate: (settings: ChartSettings) => void
}

interface ChartSettings {
  lineThickness: number
  showDots: boolean
  gridLines: boolean
  colors: {
    primary: string
    secondary: string
    grid: string
  }
  animation: boolean
  yAxisMin?: number
  yAxisMax?: number
}

export const ChartCustomization = ({
  onUpdate,
}: ChartCustomizationProps): JSX.Element => {
  const [settings, setSettings] = useState<ChartSettings>({
    lineThickness: 2,
    showDots: false,
    gridLines: true,
    colors: {
      primary: '#8884d8',
      secondary: '#82ca9d',
      grid: '#e0e0e0',
    },
    animation: true,
  })

  const handleChange = (key: keyof ChartSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onUpdate(newSettings)
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Chart Customization
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Line Thickness</Typography>
        <Slider
          value={settings.lineThickness}
          onChange={(_, value) => handleChange('lineThickness', value)}
          min={1}
          max={5}
          step={0.5}
          marks
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.showDots}
              onChange={(e) => handleChange('showDots', e.target.checked)}
            />
          }
          label="Show Data Points"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.gridLines}
              onChange={(e) => handleChange('gridLines', e.target.checked)}
            />
          }
          label="Show Grid Lines"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Colors</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ColorPicker
            value={settings.colors.primary}
            onChange={(color) =>
              handleChange('colors', { ...settings.colors, primary: color })
            }
          />
          <ColorPicker
            value={settings.colors.secondary}
            onChange={(color) =>
              handleChange('colors', { ...settings.colors, secondary: color })
            }
          />
          <ColorPicker
            value={settings.colors.grid}
            onChange={(color) =>
              handleChange('colors', { ...settings.colors, grid: color })
            }
          />
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Y-Axis Range</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Min"
            type="number"
            size="small"
            value={settings.yAxisMin || ''}
            onChange={(e) => handleChange('yAxisMin', Number(e.target.value))}
          />
          <TextField
            label="Max"
            type="number"
            size="small"
            value={settings.yAxisMax || ''}
            onChange={(e) => handleChange('yAxisMax', Number(e.target.value))}
          />
        </Box>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={settings.animation}
            onChange={(e) => handleChange('animation', e.target.checked)}
          />
        }
        label="Enable Animations"
      />
    </Paper>
  )
} 