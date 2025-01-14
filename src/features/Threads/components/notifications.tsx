import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@mui/material'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow'
  user: string
  avatar: string
  content: string
  timestamp: string
}

interface NotificationsProps {
  notifications: Notification[]
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {notifications.map((notification) => (
        <ListItem key={notification.id} alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt={notification.user} src={notification.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={notification.user}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {notification.content}
                </Typography>
                {` — ${notification.timestamp}`}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
