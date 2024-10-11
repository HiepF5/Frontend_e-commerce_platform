import React from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid
} from '@mui/material'
import { styled } from '@mui/system'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaUserTag
} from 'react-icons/fa'

const StyledCard = styled(Card)(({ theme }) => ({
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

const AvatarSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(4),
    marginBottom: 0
  }
}))

const InfoSection = styled(Box)({
  flex: 1
})

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius
  }
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main
}))

const UserInfo = () => {
  const userInfo = {
    userCode: 'AC00000026',
    firstName: 'new',
    lastName: 'new',
    dateOfBirth: '10/13/2024',
    phoneNumber: '1212',
    email: 'fileanh11102002@gmail.com',
    username: 'user2',
    roles: ['KHACHHANG'],
    activeStatus: true,
    enableStatus: true
  }

  return (
    <StyledCard>
      <AvatarSection>
        <Avatar
          alt={`${userInfo.firstName} ${userInfo.lastName}`}
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
          sx={{ width: 120, height: 120, boxShadow: 3 }}
        />
      </AvatarSection>
      <InfoSection>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InfoItem>
                <IconWrapper>
                  <FaUser />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>User Code</Typography>
                  <Typography variant='body2'>{userInfo.userCode}</Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaBirthdayCake />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Date of Birth</Typography>
                  <Typography variant='body2'>
                    {userInfo.dateOfBirth}
                  </Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaPhone />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Phone Number</Typography>
                  <Typography variant='body2'>
                    {userInfo.phoneNumber}
                  </Typography>
                </Box>
              </InfoItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoItem>
                <IconWrapper>
                  <FaEnvelope />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Email</Typography>
                  <Typography variant='body2'>{userInfo.email}</Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaUser />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Username</Typography>
                  <Typography variant='body2'>{userInfo.username}</Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaUserTag />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Roles</Typography>
                  <Box mt={1}>
                    {userInfo.roles.map((role, index) => (
                      <Chip
                        key={index}
                        label={role}
                        size='small'
                        color='primary'
                        variant='outlined'
                        style={{ marginRight: 4, marginBottom: 4 }}
                      />
                    ))}
                  </Box>
                </Box>
              </InfoItem>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant='subtitle2' gutterBottom>
              Status
            </Typography>
            <Box display='flex' alignItems='center'>
              <Chip
                label={userInfo.activeStatus ? 'Active' : 'Inactive'}
                color={userInfo.activeStatus ? 'success' : 'error'}
                size='small'
                style={{ marginRight: 8 }}
              />
              <Chip
                label={userInfo.enableStatus ? 'Enabled' : 'Disabled'}
                color={userInfo.enableStatus ? 'primary' : 'default'}
                size='small'
              />
            </Box>
          </Box>
        </CardContent>
      </InfoSection>
    </StyledCard>
  )
}

export default UserInfo
