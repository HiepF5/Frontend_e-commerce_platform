import { useState } from 'react'
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Popper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener
} from '@mui/material'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'

interface SearchBarProps {
  onSearch: (term: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <Box
      component='form'
      onSubmit={handleSearch}
      sx={{
        position: 'fixed',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1100,
        width: 'auto',
        maxWidth: 600
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: '2px 2px',
          display: 'flex',
          alignItems: 'center',
          width: 370,
          height: 35,
          borderRadius: 50,
          bgcolor: 'background.paper',
          '&:hover': {
            boxShadow: 3
          }
        }}
      >
        <IconButton type='submit' sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Tìm kiếm bài viết...'
          sx={{
            ml: 1,
            flex: 1,
            '& input': {
              padding: '4px 0'
            }
          }}
        />
        {searchTerm && (
          <IconButton sx={{ p: '10px' }} onClick={handleClear}>
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  )
}

