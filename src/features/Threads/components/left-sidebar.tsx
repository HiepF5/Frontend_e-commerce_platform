import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Home, Search, Notifications, Mail, Person } from '@mui/icons-material'
import {  useNavigate } from 'react-router-dom'

export function LeftSidebar() {
  const navigate = useNavigate()
  return (
    <List
      sx={{
        width: 250,
        height: '100vh',
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      <ListItemButton component='a'>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText
          primary='Trang chủ'
          onClick={() => navigate('/threads/home')}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary='Khám phá' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Notifications />
        </ListItemIcon>
        <ListItemText primary='Thông báo' />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Mail />
        </ListItemIcon>
        <ListItemText primary='Tin nhắn' />
      </ListItemButton>

      <ListItemButton component='a'>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary='Hồ sơ' onClick={() => navigate('/threads/me')} />
      </ListItemButton>
    </List>
  )
}
