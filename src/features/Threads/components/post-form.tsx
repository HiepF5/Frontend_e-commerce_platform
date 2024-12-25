import React, { useState } from 'react'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Box,
  IconButton,
  Typography,
  Divider,
  Avatar
} from '@mui/material'
import {
  AddAPhoto,
  Close,
  Public,
  Lock,
  People,
  LocationOn,
  EmojiEmotions
} from '@mui/icons-material'
import { Post } from '../types/threads.interface'

interface PostFormProps {
  onSubmit: (
    post: Omit<
      Post,
      'id' | 'author' | 'avatar' | 'timestamp' | 'reactions' | 'comments'
    >
  ) => void
  currentUser: {
    name: string
    avatar: string
  }
}

export default function PostForm({ onSubmit, currentUser }: PostFormProps) {
  const [content, setContent] = useState('')
  const [postRole, setPostRole] = useState<'KHACHHANG' | 'ADMIN' | 'STAFF'>(
    'KHACHHANG'
  )
  const [visibility, setVisibility] = useState<
    'PUBLIC' | 'PRIVATE' | 'FRIENDS'
  >('PUBLIC')
  const [location, setLocation] = useState('')
  const [hashTags, setHashTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [showLocationInput, setShowLocationInput] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      postRole,
      visibility,
      content,
      location,
      hashTags,
      image: image || undefined
    })
    onSubmit({
      postRole,
      visibility,
      content,
      location,
      hashTags,
      image: image || undefined
    })
    setContent('')
    setLocation('')
    setHashTags([])
    setImage(null)
    setShowLocationInput(false)
  }

  const handleAddTag = () => {
    if (currentTag && !hashTags.includes(currentTag)) {
      setHashTags([...hashTags, currentTag])
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setHashTags(hashTags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'PUBLIC':
        return <Public />
      case 'PRIVATE':
        return <Lock />
      case 'FRIENDS':
        return <People />
    }
  }

  return (
    <Card elevation={0} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={currentUser.avatar} sx={{ mr: 2 }} />
          <Typography variant='subtitle1'>{currentUser.name}</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder='Hôm nay bạn đang nghĩ gì?'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant='outlined'
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size='small'>
                <Select
                  value={postRole}
                  onChange={(e) =>
                    setPostRole(
                      e.target.value as 'KHACHHANG' | 'ADMIN' | 'STAFF'
                    )
                  }
                  displayEmpty
                >
                  <MenuItem value='KHACHHANG'>Khách hàng</MenuItem>
                  <MenuItem value='ADMIN'>Admin</MenuItem>
                  <MenuItem value='STAFF'>Staff</MenuItem>
                </Select>
              </FormControl>
              <FormControl size='small'>
                <Select
                  value={visibility}
                  onChange={(e) =>
                    setVisibility(
                      e.target.value as 'PUBLIC' | 'PRIVATE' | 'FRIENDS'
                    )
                  }
                  displayEmpty
                  renderValue={(value) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getVisibilityIcon()}
                      <Typography sx={{ ml: 1 }}>
                        {value === 'PUBLIC'
                          ? 'Công khai'
                          : value === 'PRIVATE'
                            ? 'Chỉ mình tôi'
                            : 'Bạn bè'}
                      </Typography>
                    </Box>
                  )}
                >
                  <MenuItem value='PUBLIC'>Công khai</MenuItem>
                  <MenuItem value='PRIVATE'>Chỉ mình tôi</MenuItem>
                  <MenuItem value='FRIENDS'>Bạn bè</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <IconButton
                onClick={() => setShowLocationInput(!showLocationInput)}
              >
                <LocationOn color={location ? 'primary' : 'inherit'} />
              </IconButton>
              <IconButton component='label'>
                <AddAPhoto color={image ? 'primary' : 'inherit'} />
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={handleImageUpload}
                />
              </IconButton>
              <IconButton>
                <EmojiEmotions />
              </IconButton>
            </Box>
          </Box>
          {showLocationInput && (
            <TextField
              fullWidth
              size='small'
              placeholder='Thêm vị trí'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              size='small'
              placeholder='Thêm hashtag'
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
            />
            <Button onClick={handleAddTag} variant='contained' sx={{ ml: 1 }}>
              Thêm
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {hashTags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onDelete={() => handleRemoveTag(tag)}
                color='primary'
                variant='outlined'
              />
            ))}
          </Box>
          {image && (
            <Box sx={{ position: 'relative', mb: 2 }}>
              <img
                src={image}
                alt='Uploaded preview'
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'background.paper'
                }}
                onClick={() => setImage(null)}
              >
                <Close />
              </IconButton>
            </Box>
          )}
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='submit' variant='contained' color='primary'>
              Đăng bài
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}
