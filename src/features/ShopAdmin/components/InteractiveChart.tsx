import { useState, useCallback, SetStateAction } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts'
import { Box, Typography } from '@mui/material'
import { ChartControls } from './ChartControls'
import { DataAnalysisTools } from './DataAnalysisTools'
import { ChartCustomization } from './ChartCustomization'

interface InteractiveChartProps {
  data: any[]
  dataKey: string
  valueKey: string
  onZoom?: (startIndex: number, endIndex: number) => void
  comparisonData?: any[]
  highlightRanges?: Array<{
    start: number
    end: number
    color: string
  }>
  thresholds?: Array<{
    value: number
    color: string
    label: string
  }>
}

export const InteractiveChart = ({
  data,
  dataKey,
  valueKey,
  onZoom,
  comparisonData,
  highlightRanges,
  thresholds,
}: InteractiveChartProps): JSX.Element => {
  const [refAreaLeft, setRefAreaLeft] = useState('')
  const [refAreaRight, setRefAreaRight] = useState('')
  const [mouseDown, setMouseDown] = useState(false)
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line')
  const [compareMode, setCompareMode] = useState(false)
  const [highlightMode, setHighlightMode] = useState<'threshold' | 'range' | 'peaks' | 'none'>('none')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [chartSettings, setChartSettings] = useState({
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

  const handleMouseDown = useCallback((e: any) => {
    if (e) {
      setRefAreaLeft(e.activeLabel)
      setMouseDown(true)
    }
  }, [])

  const handleMouseMove = useCallback((e: any) => {
    if (mouseDown && e) {
      setRefAreaRight(e.activeLabel)
    }
  }, [mouseDown])

  const handleMouseUp = useCallback(() => {
    if (refAreaLeft && refAreaRight && onZoom) {
      const startIndex = data.findIndex(item => item[dataKey] === refAreaLeft)
      const endIndex = data.findIndex(item => item[dataKey] === refAreaRight)
      onZoom(Math.min(startIndex, endIndex), Math.max(startIndex, endIndex))
    }
    setRefAreaLeft('')
    setRefAreaRight('')
    setMouseDown(false)
  }, [refAreaLeft, refAreaRight, data, dataKey, onZoom])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setZoomLevel(1)
    onZoom && onZoom(0, data.length - 1)
  }

  const ChartComponent = {
    line: LineChart,
    area: AreaChart,
    bar: BarChart,
  }[chartType]

  return (
    <Box>
      <ChartControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onToggleCompare={() => setCompareMode(!compareMode)}
        onHighlightMode={setHighlightMode}
        onChartType={setChartType}
      />
      
      <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ChartComponent
            data={data}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={dataKey}
              allowDataOverflow
              domain={['dataMin', 'dataMax']}
              scale="time"
            />
            <YAxis
              allowDataOverflow
              domain={['auto', 'auto']}
              scale="linear"
            />
            <Tooltip />
            <Legend />

            {chartType === 'line' && (
              <Line
                type="monotone"
                dataKey={valueKey}
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
              />
            )}
            {chartType === 'area' && (
              <Area
                type="monotone"
                dataKey={valueKey}
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            )}
            {chartType === 'bar' && (
              <Bar dataKey={valueKey} fill="#8884d8" />
            )}

            {compareMode && comparisonData && (
              <>
                {chartType === 'line' && (
                  <Line
                    type="monotone"
                    data={comparisonData}
                    dataKey={valueKey}
                    stroke="#82ca9d"
                    strokeDasharray="5 5"
                    dot={false}
                  />
                )}
                {chartType === 'area' && (
                  <Area
                    type="monotone"
                    data={comparisonData}
                    dataKey={valueKey}
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.1}
                  />
                )}
                {chartType === 'bar' && (
                  <Bar
                    data={comparisonData}
                    dataKey={valueKey}
                    fill="#82ca9d"
                    fillOpacity={0.5}
                  />
                )}
              </>
            )}

            {highlightMode === 'range' && highlightRanges?.map((range, index) => (
              <ReferenceArea
                key={index}
                x1={range.start}
                x2={range.end}
                fill={range.color}
                fillOpacity={0.3}
              />
            ))}

            {highlightMode === 'threshold' && thresholds?.map((threshold, index) => (
              <ReferenceLine
                key={index}
                y={threshold.value}
                stroke={threshold.color}
                strokeDasharray="3 3"
                label={threshold.label}
              />
            ))}

            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
                fill="#8884d8"
                fillOpacity={0.3}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </Box>

      <DataAnalysisTools
        data={data}
        valueKey={valueKey}
        onHighlight={(range) => {
          setHighlightMode('range')
          // Add highlight range logic
        }}
      />
      <ChartCustomization
        onUpdate={setChartSettings}
      />
    </Box>
  )
} 