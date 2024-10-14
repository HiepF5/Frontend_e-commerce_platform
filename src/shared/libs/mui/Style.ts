import { styled } from '@mui/system'
import {
  Box,
  Card,
} from '@mui/material'
export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  }
}))

export const AvatarSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(4),
    marginBottom: 0
  }
}))

export const InfoSection = styled(Box)({
  flex: 1
})

export const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius
  }
}))

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main
}))