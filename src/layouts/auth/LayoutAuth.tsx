import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/system';

import Box from '@mui/material/Box';


type MainProps = BoxProps & {
  layoutQuery: Breakpoint;
};

export function AuthLayout({ sx, children, layoutQuery, ...other }: MainProps) {

  const renderContent = (
    <Box
      sx={{
        width: 1,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',

      }}
    >
      {children}
    </Box>
  )

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        flexDirection: 'column',
        ...sx
      }}
      {...other}
    >
      {renderContent}
    </Box>
  )
}
