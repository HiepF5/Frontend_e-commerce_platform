import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

interface DrilldownLevel {
  name: string
  data: any[]
}

interface DrilldownChartProps {
  title: string
  initialData: any[]
  getDrilldownData: (item: any) => DrilldownLevel
  dataKey: string
  valueKey: string
}

export const DrilldownChart = ({
  title,
  initialData,
  getDrilldownData,
  dataKey,
  valueKey,
}: DrilldownChartProps): JSX.Element => {
  const [drilldownStack, setDrilldownStack] = useState<DrilldownLevel[]>([
    { name: 'Overview', data: initialData },
  ])
  const currentLevel = drilldownStack[drilldownStack.length - 1]

  const handleDrilldown = (item: any) => {
    const nextLevel = getDrilldownData(item)
    setDrilldownStack([...drilldownStack, nextLevel])
  }

  const handleDrillUp = () => {
    if (drilldownStack.length > 1) {
      setDrilldownStack(drilldownStack.slice(0, -1))
    }
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {drilldownStack.length > 1 && (
          <IconButton onClick={handleDrillUp} size="small" sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Breadcrumbs aria-label="drilldown-path">
            {drilldownStack.map((level, index) => (
              <Link
                key={level.name}
                color={index === drilldownStack.length - 1 ? 'text.primary' : 'inherit'}
                sx={{ cursor: index < drilldownStack.length - 1 ? 'pointer' : 'default' }}
                onClick={() => {
                  if (index < drilldownStack.length - 1) {
                    setDrilldownStack(drilldownStack.slice(0, index + 1))
                  }
                }}
              >
                {level.name}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={currentLevel.data}
          onClick={(data) => {
            if (data && data.activePayload && drilldownStack.length === 1) {
              handleDrilldown(data.activePayload[0].payload)
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={valueKey} fill="#8884d8" cursor="pointer" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
} 