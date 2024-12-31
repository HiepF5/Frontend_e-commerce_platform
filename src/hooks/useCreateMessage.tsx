import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createChatWithShop } from '@api/chatMessageApi'

const useCreateMessage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChatClick = async (shopCode: string | null) => {
    if (!shopCode) return
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const response = await createChatWithShop({
        user_code: user.user_code,
        shop_code: shopCode
      })

      if (response.code === 200) {
        toast.success('Chat created successfully!')
        navigate('/messenger-user/chat')
      }
    } catch (error) {
      toast.error('Failed to create chat. Please try again.')
      console.error('Error creating chat:', error)

    } finally {
      setLoading(false)
    }
  }

  return { handleChatClick, loading }
}

export default useCreateMessage
