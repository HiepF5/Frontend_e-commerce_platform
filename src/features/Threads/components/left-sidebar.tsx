import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Box
} from '@mui/material'
import { Home, Search, Notifications, Mail, Person } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

export function LeftSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: <Home />, text: 'Trang chủ', path: '/threads/home' },
    { icon: <Search />, text: 'Khám phá', path: '/explore' },
    { icon: <Notifications />, text: 'Thông báo', path: '/notifications' },
    { icon: <Mail />, text: 'Tin nhắn', path: '/messenger-user/chat' },
    { icon: <Person />, text: 'Hồ sơ', path: '/threads/me' }
  ]

  return (
    <Paper
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h6' fontWeight='bold'>
          Menu
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, py: 0 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark'
                },
                '& .MuiListItemIcon-root': {
                  color: 'inherit'
                }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}
