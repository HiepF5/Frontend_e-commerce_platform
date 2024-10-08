import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import MainRoutes from './routes/Routes'
import { useAppSelector } from './store/hook'

function App() {
  const themeColor = useAppSelector((state) => state.theme.themeColor)

  const theme = createTheme({
    palette: {
      primary: {
        main: themeColor
      },
      secondary: {
        main: themeColor
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainRoutes />
    </ThemeProvider>
  )
 
}

export default App
