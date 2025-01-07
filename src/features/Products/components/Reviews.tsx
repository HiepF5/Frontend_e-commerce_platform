'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Rating,
  LinearProgress,
  Grid,
  Paper,
  Button,
  CircularProgress
} from '@mui/material'
import { FaRobot } from 'react-icons/fa6'
import { analysisPromptApi, reviewWithPromptApi, chatWithPromptApi } from '@api/geminiApi'
import { toast } from 'react-toastify'
import ReactMarkdown from 'react-markdown'
import { styled } from '@mui/system'
import { useAppDispatch } from '@store/hook'
import { addUserMessage, toggleChat } from '@features/ChatBot/slices/ChatBotSlice'
import { IProductData } from '../types/products.interface'

interface ReviewImage {
  id: string
  url: string
}

interface ReviewsProps {
  productId?: string
  productDetail?: IProductData
}

// Styled component cho markdown content
const MarkdownContent = styled('div')(({ theme }) => ({
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
  },
  '& h1, h2, h3, h4, h5, h6': {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  '& ul, ol': {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  '& li': {
    marginBottom: theme.spacing(1),
  },
  '& strong': {
    fontWeight: 600,
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.grey[300]}`,
    paddingLeft: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875em',
  },
}))

const reviewImages: ReviewImage[] = [
  { id: '1', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/1.jpg?raw=true' },
  { id: '2', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true' },
  { id: '3', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/3.jpg?raw=true' },
  { id: '4', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/4.jpg?raw=true' },
  { id: '5', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/5.jpg?raw=true' },
  { id: '6', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/1.jpg?raw=true' },
  { id: '7', url: 'https://github.com/HiepF5/Db_Ecommercer/blob/main/IPhone/IPhone%2015/2.jpg?raw=true' }
]

export default function Reviews({ productId, productDetail }: ReviewsProps) {
  const [loadingCustomerReviews, setLoadingCustomerReviews] = useState(false)
  const [loadingAIAnalysis, setLoadingAIAnalysis] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState('')
  const [customerReviews, setCustomerReviews] = useState('')
  const dispatch = useAppDispatch()

  const handleGetAIAnalysis = async () => {
    try {
      setLoadingAIAnalysis(true)
      if (!productId) {
        throw new Error('Product ID is required')
      }
      const response = await analysisPromptApi({ product_id: productId })
      if (response.data) {
        setAiAnalysis(response.data.toString())
      }
    } catch (error) {
      toast.error('Lỗi khi lấy phân tích từ AI')
      console.error(error)
    } finally {
      setLoadingAIAnalysis(false)
    }
  }

  const handleGetCustomerReviews = async () => {
    try {
      setLoadingCustomerReviews(true)
      if (!productId) {
        throw new Error('Product ID is required')
      }
      const response = await reviewWithPromptApi({ product_id: productId })
      if (response.data) {
        setCustomerReviews(response.data.toString())
      }
    } catch (error) {
      toast.error('Lỗi khi tải đánh giá khách hàng')
      console.error(error)
    } finally {
      setLoadingCustomerReviews(false)
    }
  }

  const handleAIConsultation = async () => {
    try {
      
      
      // Mở ChatBot trước
      dispatch(toggleChat(true))

      // Lấy prompt_name từ localStorage
      const promptName = localStorage.getItem('prompt_ai')
      if (!promptName) {
        toast.error('Vui lòng chọn prompt AI trong phần quản lý Prompt')
        return
      }

      // Tạo message với thông tin sản phẩm
      if (!productDetail) {
        toast.error('Thông tin sản phẩm không khả dụng')
        return
      }
      const message = `Tôi muốn được tư vấn về sản phẩm "${productDetail.title}"`
      const productInfo = JSON.stringify(productDetail)

      // Dispatch action để thêm tin nhắn người dùng
      dispatch(addUserMessage({ text: message, isUser: true }))

      // Gọi API chat với prompt
      const response = await chatWithPromptApi({
        promptName: promptName,
        message: encodeURIComponent(`${message}\nThông tin sản phẩm: ${productInfo}`)
      })
      dispatch(addUserMessage({ text: response.data, isUser: false }))

      // // Dispatch action để thêm phản hồi từ AI
      // if (response.data) {
      //   dispatch(fetchChatResponse(response.data.toString()))
      // }

    } catch (error) {
      toast.error('Lỗi khi tư vấn với AI')
      console.error(error)
    }
  }

  useEffect(() => {
    handleGetCustomerReviews()
  }, [])

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h5' gutterBottom fontWeight='bold'>
        Đánh giá sản phẩm
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant='h3' gutterBottom>
              5.00
            </Typography>
            <Rating value={5} readOnly size='large' />
            <Typography color='text.secondary' sx={{ mt: 1 }}>
              (6 đánh giá)
            </Typography>
          </Box>

          <Box sx={{ px: 2 }}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Box
                key={rating}
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <Rating value={rating} readOnly size='small' sx={{ mr: 1 }} />
                <LinearProgress
                  variant='determinate'
                  value={rating === 5 ? 100 : 0}
                  sx={{ flexGrow: 1, mx: 1 }}
                />
                <Typography variant='body2' color='text.secondary' sx={{ minWidth: 20 }}>
                  {rating === 5 ? 6 : 0}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Đánh giá từ khách hàng
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAIConsultation}
                startIcon={<FaRobot />}
              >
                Tư vấn với AI
              </Button>
            </Box>
            
            {loadingCustomerReviews ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : (
              <MarkdownContent>
                {customerReviews && <ReactMarkdown>{customerReviews}</ReactMarkdown>}
              </MarkdownContent>
            )}
          </Paper>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaRobot size={24} />
                <Typography variant="h6">
                  Phân tích từ AI
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGetAIAnalysis}
                disabled={loadingAIAnalysis}
                startIcon={loadingAIAnalysis && <CircularProgress size={20} color="inherit" />}
              >
                Phân tích đánh giá
              </Button>
            </Box>

            {loadingAIAnalysis ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : (
              <MarkdownContent>
                {aiAnalysis ? (
                  <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                ) : (
                  <Typography color="text.secondary" align="center">
                    Nhấn nút "Phân tích đánh giá" để xem phân tích chi tiết từ AI
                  </Typography>
                )}
              </MarkdownContent>
            )}
          </Paper>

          <Box sx={{ mt: 4 }}>
            <Typography variant='h6' gutterBottom>
              Hình ảnh từ khách hàng ({reviewImages.length})
            </Typography>
            <Grid container spacing={1}>
              {reviewImages.map((image) => (
                <Grid item key={image.id} xs={4} sm={3} md={2}>
                  <Box
                    component="img"
                    src={image.url}
                    alt='Review'
                    sx={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1',
                      objectFit: 'cover',
                      borderRadius: 1,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        cursor: 'pointer'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
