import { useState } from 'react'
import {
  Box,
  IconButton,
  Popover,
  TextField,
  Button,
  Typography,
  Chip,
} from '@mui/material'
import {
  NoteAdd as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { AnnotationTemplates } from './AnnotationTemplates'

export interface Annotation {
  id: string
  x: number
  y: number
  text: string
  color?: string
}

interface ChartAnnotationProps {
  annotations: Annotation[]
  onAddAnnotation: (annotation: Annotation) => void
  onDeleteAnnotation: (id: string) => void
  onEditAnnotation: (annotation: Annotation) => void
  chartWidth: number
  chartHeight: number
}

export const ChartAnnotation = ({
  annotations,
  onAddAnnotation,
  onDeleteAnnotation,
  onEditAnnotation,
  chartWidth,
  chartHeight,
}: ChartAnnotationProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [annotationText, setAnnotationText] = useState('')
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showTemplates, setShowTemplates] = useState(false)

  const handleChartClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / chartWidth) * 100
    const y = ((event.clientY - rect.top) / chartHeight) * 100
    setPosition({ x, y })
    setAnchorEl(event.currentTarget)
  }

  const handleAddAnnotation = () => {
    if (annotationText.trim()) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        x: position.x,
        y: position.y,
        text: annotationText,
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
      }
      onAddAnnotation(newAnnotation)
      setAnnotationText('')
      setAnchorEl(null)
    }
  }

  const handleEditClick = (annotation: Annotation) => {
    setSelectedAnnotation(annotation)
    setAnnotationText(annotation.text)
    setAnchorEl(document.getElementById(annotation.id))
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      onClick={handleChartClick}
    >
      {annotations.map((annotation) => (
        <Box
          key={annotation.id}
          id={annotation.id}
          sx={{
            position: 'absolute',
            left: `${annotation.x}%`,
            top: `${annotation.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Chip
            label={annotation.text}
            size="small"
            color="primary"
            sx={{ bgcolor: annotation.color }}
            onDelete={() => onDeleteAnnotation(annotation.id)}
            deleteIcon={
              <Box sx={{ display: 'flex' }}>
                <IconButton size="small" onClick={() => handleEditClick(annotation)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        </Box>
      ))}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
          setSelectedAnnotation(null)
          setAnnotationText('')
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle2">
              {selectedAnnotation ? 'Edit Annotation' : 'Add Annotation'}
            </Typography>
            <Button
              size="small"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              {showTemplates ? 'Hide Templates' : 'Show Templates'}
            </Button>
          </Box>

          {showTemplates ? (
            <AnnotationTemplates
              onSelectTemplate={(template) => {
                setAnnotationText(template.text)
                const newAnnotation: Annotation = {
                  id: Date.now().toString(),
                  x: position.x,
                  y: position.y,
                  text: template.text,
                  color: template.color,
                }
                onAddAnnotation(newAnnotation)
                setAnnotationText('')
                setAnchorEl(null)
                setShowTemplates(false)
              }}
            />
          ) : (
            <>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
                placeholder="Enter annotation text..."
                size="small"
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setAnchorEl(null)
                    setSelectedAnnotation(null)
                    setAnnotationText('')
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    if (selectedAnnotation) {
                      onEditAnnotation({
                        ...selectedAnnotation,
                        text: annotationText,
                      })
                    } else {
                      handleAddAnnotation()
                    }
                  }}
                >
                  {selectedAnnotation ? 'Update' : 'Add'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Popover>
    </Box>
  )
} 