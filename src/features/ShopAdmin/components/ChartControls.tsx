import {
  Box,
  ButtonGroup,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  ZoomIn,
  ZoomOut,
  RestartAlt,
  Timeline,
  CompareArrows,
  Brush,
  ColorLens,
} from '@mui/icons-material'
import { useState } from 'react'

interface ChartControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onToggleCompare: () => void
  onHighlightMode: (mode: 'threshold' | 'range' | 'peaks' | 'none') => void
  onChartType: (type: 'line' | 'area' | 'bar') => void
}

export const ChartControls = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleCompare,
  onHighlightMode,
  onChartType,
}: ChartControlsProps): JSX.Element => {
  const [highlightMenu, setHighlightMenu] = useState<null | HTMLElement>(null)
  const [chartTypeMenu, setChartTypeMenu] = useState<null | HTMLElement>(null)

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <ButtonGroup size="small">
        <Tooltip title="Zoom In">
          <Button onClick={onZoomIn}>
            <ZoomIn />
          </Button>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <Button onClick={onZoomOut}>
            <ZoomOut />
          </Button>
        </Tooltip>
        <Tooltip title="Reset View">
          <Button onClick={onReset}>
            <RestartAlt />
          </Button>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup size="small">
        <Tooltip title="Chart Type">
          <IconButton onClick={(e) => setChartTypeMenu(e.currentTarget)}>
            <Timeline />
          </IconButton>
        </Tooltip>
        <Tooltip title="Compare Mode">
          <IconButton onClick={onToggleCompare}>
            <CompareArrows />
          </IconButton>
        </Tooltip>
        <Tooltip title="Highlight Mode">
          <IconButton onClick={(e) => setHighlightMenu(e.currentTarget)}>
            <ColorLens />
          </IconButton>
        </Tooltip>
        <Tooltip title="Data Brush">
          <IconButton>
            <Brush />
          </IconButton>
        </Tooltip>
      </ButtonGroup>

      <Menu
        anchorEl={highlightMenu}
        open={Boolean(highlightMenu)}
        onClose={() => setHighlightMenu(null)}
      >
        <MenuItem onClick={() => {
          onHighlightMode('threshold')
          setHighlightMenu(null)
        }}>
          Threshold Highlight
        </MenuItem>
        <MenuItem onClick={() => {
          onHighlightMode('range')
          setHighlightMenu(null)
        }}>
          Range Highlight
        </MenuItem>
        <MenuItem onClick={() => {
          onHighlightMode('peaks')
          setHighlightMenu(null)
        }}>
          Peak Detection
        </MenuItem>
        <MenuItem onClick={() => {
          onHighlightMode('none')
          setHighlightMenu(null)
        }}>
          Clear Highlights
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={chartTypeMenu}
        open={Boolean(chartTypeMenu)}
        onClose={() => setChartTypeMenu(null)}
      >
        <MenuItem onClick={() => {
          onChartType('line')
          setChartTypeMenu(null)
        }}>
          Line Chart
        </MenuItem>
        <MenuItem onClick={() => {
          onChartType('area')
          setChartTypeMenu(null)
        }}>
          Area Chart
        </MenuItem>
        <MenuItem onClick={() => {
          onChartType('bar')
          setChartTypeMenu(null)
        }}>
          Bar Chart
        </MenuItem>
      </Menu>
    </Box>
  )
} 