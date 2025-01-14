import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Box
} from '@mui/material'

interface ChangeAvatarDialogProps {
  open: boolean
  onClose: () => void
  userInfo: { first_name: string; last_name: string; image_url: string }
  onChangeAvatar: (file: File) => Promise<void>
}

const ChangeAvatarDialog: React.FC<ChangeAvatarDialogProps> = ({
  open,
  onClose,
  userInfo,
  onChangeAvatar
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSave = async () => {
    onClose()
    if (selectedFile) {
      await onChangeAvatar(selectedFile) 
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Avatar</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            alt='Preview Avatar'
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : userInfo?.image_url
            }
            sx={{ width: 120, height: 120 }}
          />
        </Box>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange} // Khi chọn file mới
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary' disabled={!selectedFile}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeAvatarDialog
