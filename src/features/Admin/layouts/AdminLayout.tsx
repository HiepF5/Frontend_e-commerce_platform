import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard, People, ShoppingCart, LocalShipping, LocalOffer, SafetyDividerRounded } from '@mui/icons-material'
import { Outlet, useNavigate } from 'react-router-dom'

const drawerWidth = 240

const AdminLayout = (): JSX.Element => {
  const navigate = useNavigate()

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Users', icon: <People />, path: '/admin/users' },
    { text: 'Products', icon: <ShoppingCart />, path: '/admin/products' },
    { text: 'Orders', icon: <LocalShipping />, path: '/admin/orders' },
    { text: 'Vouchers', icon: <LocalOffer />, path: '/admin/vouchers' },
    {
      text: 'Orders Manager',
      icon: <LocalShipping />,
      path: '/admin/orders-manager'
    },
    {
      text: 'Prompt AI',
      icon: <SafetyDividerRounded />,
      path: '/admin/prompt-ai'
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem component="li" key={item.text} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout 