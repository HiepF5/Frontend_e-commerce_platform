import React, { useState } from 'react'
import {
  Avatar,
  Box,
  CardContent,
  Typography,
  Chip,
  Grid,
  Button
} from '@mui/material'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaUserTag
} from 'react-icons/fa'
import {
  AvatarSection,
  IconWrapper,
  InfoItem,
  InfoSection,
  StyledCard
} from '@shared/libs/mui/Style'
import {IUser } from '~/types/users.interface'
import ChangeAvatarDialog from './ChangeAvatarDialog'
interface UserInfoProps {
  setDialogOpen: (open: boolean) => void
  shouldUpdate: boolean
  userInfo: IUser
  onChangeAvatar: (file: File) => Promise<void>
  onDialogOpen: () => void
}

const UserInfo: React.FC<UserInfoProps> = ({
  userInfo,
  onDialogOpen,
  onChangeAvatar
}) => {
  const [avatarPreview, setAvatarPreview] = useState(userInfo.image_url)
  
   const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }
   const handleAvatarChange = async (file: File) => {
     const previewUrl = URL.createObjectURL(file) 
     setAvatarPreview(previewUrl) 
     await onChangeAvatar(file) 
   }
  return (
    <StyledCard>
      <AvatarSection>
        <Avatar
          alt={`${userInfo?.first_name} ${userInfo?.last_name}`}
          src={avatarPreview}
          sx={{ width: 120, height: 120, boxShadow: 3 }}
          onClick={handleDialogOpen}
        />
        <ChangeAvatarDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          userInfo={userInfo}
          onChangeAvatar={handleAvatarChange}
        />
      </AvatarSection>
      <InfoSection>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            {userInfo?.first_name} {userInfo?.last_name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InfoItem>
                <IconWrapper>
                  <FaUser />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>User Code</Typography>
                  <Typography variant='body2'>{userInfo?.user_code}</Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaBirthdayCake />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Date of Birth</Typography>
                  <Typography variant='body2'>
                    {userInfo?.date_of_birth}
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
                    {userInfo?.phone_number}
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
                  <Typography variant='body2'>{userInfo?.email}</Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaUser />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Username</Typography>
                  <Typography variant='body2'>{userInfo?.username}</Typography>
                </Box>
              </InfoItem>
              <InfoItem>
                <IconWrapper>
                  <FaUserTag />
                </IconWrapper>
                <Box>
                  <Typography variant='subtitle2'>Roles</Typography>
                  <Box mt={1}>
                    {userInfo?.list_role.map((role, index) => (
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
                label={userInfo?.active ? 'Active' : 'Inactive'}
                color={userInfo?.active ? 'success' : 'error'}
                size='small'
                style={{ marginRight: 8 }}
              />
              <Chip
                label={userInfo?.enable ? 'Enabled' : 'Disabled'}
                color={userInfo?.enable ? 'primary' : 'default'}
                size='small'
              />
            </Box>
          </Box>
        </CardContent>
        <Button
          type='button'
          variant='contained'
          color='primary'
          onClick={onDialogOpen}
        >
          Change Info
        </Button>
      </InfoSection>
    </StyledCard>
  )
}

export default UserInfo
