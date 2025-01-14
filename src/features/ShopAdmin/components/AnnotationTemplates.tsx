import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Chip,
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material'
import { useState } from 'react'

interface AnnotationTemplate {
  id: string
  name: string
  text: string
  color: string
}

interface AnnotationTemplatesProps {
  onSelectTemplate: (template: AnnotationTemplate) => void
}

export const AnnotationTemplates = ({ onSelectTemplate }: AnnotationTemplatesProps): JSX.Element => {
  const [templates, setTemplates] = useState<AnnotationTemplate[]>([
    {
      id: '1',
      name: 'Peak',
      text: 'Revenue peak due to promotion',
      color: '#FF4081',
    },
    {
      id: '2',
      name: 'Drop',
      text: 'Revenue drop due to technical issues',
      color: '#F44336',
    },
    {
      id: '3',
      name: 'Event',
      text: 'Special event or holiday',
      color: '#4CAF50',
    },
  ])
  const [open, setOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    text: '',
    color: '#000000',
  })

  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.text) {
      setTemplates([
        ...templates,
        {
          id: Date.now().toString(),
          ...newTemplate,
        },
      ])
      setNewTemplate({ name: '', text: '', color: '#000000' })
      setOpen(false)
    }
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id))
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Template
        </Button>
      </Box>

      <List dense>
        {templates.map((template) => (
          <ListItem
            key={template.id}
            component="li"
            onClick={() => onSelectTemplate(template)}
          >
            <ListItemText
              primary={template.name}
              secondary={template.text}
            />
            <ListItemSecondaryAction>
              <Chip
                size="small"
                style={{ backgroundColor: template.color }}
                sx={{ mr: 1 }}
              />
              <IconButton
                edge="end"
                size="small"
                onClick={() => handleDeleteTemplate(template.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Annotation Template</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Template Name"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Annotation Text"
              value={newTemplate.text}
              onChange={(e) => setNewTemplate({ ...newTemplate, text: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              label="Color"
              type="color"
              value={newTemplate.color}
              onChange={(e) => setNewTemplate({ ...newTemplate, color: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleAddTemplate}
          >
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
} 