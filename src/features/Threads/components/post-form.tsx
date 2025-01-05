import React, { useEffect, useState } from 'react'
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
import { ICreatePostJsonRequest } from '../types/threads.interface'
import SelectAddress from '@shared/components/SelectAddress/SelectAddress'
import { useAppSelector } from '@store/hook'

interface PostFormProps {
  onSubmit: (post: ICreatePostJsonRequest) => void
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const [provinceId, setProvinceId] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [wardId, setWardId] = useState('')
  const [status, setStatus] = useState(false) 
  const [address, setAddress] = useState('')
  const { provinces, districts, wards } = useAppSelector((state) => state.ghn)
  const handleProvinceChange = (provinceId: string) => {
    setProvinceId(provinceId)
    setDistrictId('') // Khi tỉnh thay đổi, quận cần được reset lại
    setWardId('') // Phường cũng cần reset lại
  }

  const handleDistrictChange = (districtId: string) => {
    setDistrictId(districtId)
    setWardId('') // Khi quận thay đổi, phường cũng cần reset lại
  }

  const handleWardChange = (wardId: string) => {
    setWardId(wardId)

  }// Giả sử status là trạng thái tải dữ liệu
   const updateLocation = (
     province: string,
     district: string,
     ward: string
   ) => {
     const newLocation = [province, district, ward].filter(Boolean).join(', ')
     setLocation(newLocation)
   }
   useEffect(() => {
     if (provinceId && districtId && wardId) {
       const province = provinces?.find((p) => p.ProvinceID === Number(provinceId))
       const district = districts?.find((d) => d.DistrictID === Number(districtId))
       const ward = wards?.find((w) => w.WardCode === wardId)

       if (province && district && ward) {
         setAddress(
           `${ward.WardName}, ${district.DistrictName}, ${province.ProvinceName}`
         )
         setLocation(`${ward.WardName}, ${district.DistrictName}, ${province.ProvinceName}`)
       }
     }
   }, [provinceId, districtId, wardId, provinces, districts, wards])
  const [content, setContent] = useState('')
  const [postRole, setPostRole] = useState<
    'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG'
  >('KHACHHANG')
  const [visibility, setVisibility] = useState<
    'PUBLIC' | 'PRIVATE' | 'FRIENDS'
  >('PUBLIC')
  const [location, setLocation] = useState('')
  const [hashTag, setHashTag] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [showLocationInput, setShowLocationInput] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const files = images.map((image) => {
      // Chuyển đổi dữ liệu base64 thành File object
      const byteString = atob(image.split(',')[1])
      const mimeString = image.split(',')[0].split(':')[1].split(';')[0]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new File([ab], `image-${Date.now()}.png`, { type: mimeString })
    })

    onSubmit({
      post_json: {
        postRole,
        visibility,
        content,
        location,
        hashTag
      },
      files: files.length > 0 ? files : null
    })

    // Reset form
    setContent('')
    setLocation('')
    setHashTag([])
    setImages([])
  }

  const handleAddTag = () => {
    if (currentTag && !hashTag.includes(currentTag)) {
      setHashTag([...hashTag, currentTag])
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setHashTag(hashTag.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const readers = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = () => reject('Error reading file')
          reader.readAsDataURL(file)
        })
      })
      Promise.all(readers).then((results) => {
        setImages((prev) => [...prev, ...results])
      })
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
  const user = JSON.parse(localStorage.getItem('user') || '{}')
 
  return (
    <Card elevation={0} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={user.image_url} sx={{ mr: 2 }} />
          <Typography variant='subtitle1'>{user.full_name}</Typography>
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
                      e.target.value as 'KHACHHANG' | 'QUANLY' | 'CHUCUAHANG'
                    )
                  }
                  displayEmpty
                >
                  <MenuItem value='KHACHHANG'>Khách hàng</MenuItem>
                  <MenuItem value='QUANLY'>Quản lý</MenuItem>
                  <MenuItem value='CHUCUAHANG'>Chủ cửa hàng</MenuItem>
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
                <AddAPhoto color={images.length > 0 ? 'primary' : 'inherit'} />
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
            <>
              <form>
                <SelectAddress
                  provinceId={provinceId}
                  districtId={districtId}
                  wardId={wardId}
                  onProvinceChange={handleProvinceChange}
                  onDistrictChange={handleDistrictChange}
                  onWardChange={handleWardChange}
                  status={status} // Truyền trạng thái (ví dụ: khi đang tải dữ liệu)
                />
              </form>
              {address && <div>Địa chỉ của bạn: {address}</div>}
            </>
            // <TextField
            //   fullWidth
            //   size='small'
            //   placeholder='Thêm vị trí'
            //   value={location}
            //   onChange={(e) => setLocation(e.target.value)}
            //   sx={{ mb: 2 }}
            // />
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
            {hashTag.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onDelete={() => handleRemoveTag(tag)}
                color='primary'
                variant='outlined'
              />
            ))}
          </Box>
          {images.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              {images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img
                    src={image}
                    alt={`Uploaded preview ${index + 1}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'background.paper'
                    }}
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <Close />
                  </IconButton>
                </Box>
              ))}
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
