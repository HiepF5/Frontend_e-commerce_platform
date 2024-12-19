import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard, Inventory, LocalShipping, Analytics, LocalOffer } from '@mui/icons-material'
import { Outlet, useNavigate } from 'react-router-dom'
import { PATHS } from '@/config/constants/paths'

const drawerWidth = 240

const ShopAdminLayout = (): JSX.Element => {
  const navigate = useNavigate()

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/shop-admin' },
    { text: 'Products', icon: <Inventory />, path: '/shop-admin/products' },
    { text: 'Orders', icon: <LocalShipping />, path: '/shop-admin/orders' },
    { text: 'Analytics', icon: <Analytics />, path: '/shop-admin/analytics' },
    {
      text: 'Vouchers',
      icon: <LocalOffer />,
      path: PATHS.VOUCHER.OWNER
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Shop Management
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
              <ListItem component="button" key={item.text} onClick={() => navigate(item.path)}>
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

export default ShopAdminLayout 