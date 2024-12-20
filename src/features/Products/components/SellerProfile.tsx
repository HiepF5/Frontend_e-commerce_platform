import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  Grid,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@mui/material'
import {
  MessageCircle,
  Store,
  ChevronRight,
  Clock,
  Users,
  Star,
  Timer
} from 'lucide-react'
import { IShopDetails } from '~/types/shop.interface'
import { followShopApi, getShopDetailApiByShopCode } from '@api/shopApi'
import { toast } from 'react-toastify'

interface SellerStats {
  rating: string
  responseRate: string
  responseTime: string
  followers: string
  lastSeen: string
  products: number
}

interface SellerProfileProps {
  stats: SellerStats
  shopCode?: string
}

export default function SellerProfile({ stats, shopCode }: SellerProfileProps) {
  const [shopDetails, setShopDetails] = useState<IShopDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  useEffect(() => {
    if (shopCode) {
      getShopDetailApiByShopCode(shopCode)
        .then((response) => {
          setShopDetails(response.data)
          setIsFollowed(false) // Assuming the API returns this info
          setLoading(false)
        })
        .catch((error) => {
          setError('Failed to fetch shop details')
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [shopCode])

  const handleFollowClick = async () => {
    if (shopCode) {
      try {
        await followShopApi({ shop_code: shopCode, is_follow: !isFollowed })
        setIsFollowed(!isFollowed)

        toast.success(
          isFollowed
            ? 'Unfollowed the shop successfully!'
            : 'Followed the shop successfully!')
      } catch (error) {
        toast.error(
          isFollowed
            ? 'Failed to unfollow the shop.'
            : 'Failed to follow the shop.')
      }
    }
  }

  if (loading) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Typography color='error'>{error}</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={shopDetails?.shopLogo}
            />
          </Grid>
          <Grid item xs>
            <Typography variant='h5'>{shopDetails?.shopName}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Store size={20} />
              <Typography variant='body2'>{shopDetails?.address}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock size={20} />
              <Typography variant='body2'>{stats.lastSeen}</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              sx={{ mr: 2 }}
              onClick={handleFollowClick}
            >
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
            <Button variant='outlined' color='primary'>
              Chat with Shop
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star size={20} />
              <Typography variant='body2'>
                Rating: {shopDetails?.rating}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MessageCircle size={20} />
              <Typography variant='body2'>
                Response Rate: {stats.responseRate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timer size={20} />
              <Typography variant='body2'>
                Response Time: {stats.responseTime}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users size={20} />
              <Typography variant='body2'>
                Followers: {shopDetails?.followCount}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Store size={20} />
              <Typography variant='body2'>
                Products: {shopDetails?.productQuantity}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}
