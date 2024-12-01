import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'


interface PostActionsProps {
  postId: string
  onUpdate: (postId: string, content: string) => Promise<void>
  onDelete: (postId: string) => void
  onShare: (postId: string) => void
}

export function PostActions({ postId, onUpdate, onDelete, onShare }: PostActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label='More options'
        aria-controls={open ? 'post-menu' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='post-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            onUpdate(postId, 'New content')
            handleClose()
          }}
        >
          <EditIcon fontSize='small' style={{ marginRight: 8 }} /> Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(postId)
            handleClose()
          }}
        >
          <DeleteIcon fontSize='small' style={{ marginRight: 8 }} /> Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            onShare(postId)
            handleClose()
          }}
        >
          <ShareIcon fontSize='small' style={{ marginRight: 8 }} /> Share
        </MenuItem>
      </Menu>
    </>
  )
}
