import { useState } from 'react'
import { Box, IconButton, Typography, Popover } from '@mui/material'
import {
  ThumbUp,
  ThumbUpOutlined,
  Favorite,
  EmojiEmotions,
  Celebration,
  SentimentVeryDissatisfied,
  Mood
} from '@mui/icons-material'
import { ReactionType } from '../types/threads.interface'
import { toast } from 'react-toastify'
import { useUserReactionsMutation } from '../api/threadsApi'

interface ReactionBarProps {
  postId: number
  likeCount: number
  isLiked: boolean | null
  myReaction: ReactionType | null
  onReactionChange: () => void
}

const reactionIcons = {
  [ReactionType.LIKE]: <ThumbUp color="primary" />,
  [ReactionType.LOVE]: <Favorite sx={{ color: '#e41e3f' }} />,
  [ReactionType.HAHA]: <EmojiEmotions sx={{ color: '#f7b125' }} />,
  [ReactionType.WOW]: <Celebration sx={{ color: '#f7b125' }} />,
  [ReactionType.SAD]: <SentimentVeryDissatisfied sx={{ color: '#f7b125' }} />,
  [ReactionType.ANGRY]: <Mood sx={{ color: '#e41e3f' }} />
}

const reactionLabels = {
  [ReactionType.LIKE]: 'Thích',
  [ReactionType.LOVE]: 'Yêu thích',
  [ReactionType.HAHA]: 'Haha',
  [ReactionType.WOW]: 'Wow',
  [ReactionType.SAD]: 'Buồn',
  [ReactionType.ANGRY]: 'Phẫn nộ'
}

export function ReactionBar({
  postId,
  likeCount,
  isLiked,
  myReaction,
  onReactionChange
}: ReactionBarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [userReaction] = useUserReactionsMutation()

  const handleReactionClick = async (event: React.MouseEvent<HTMLElement>, reaction: ReactionType) => {
    event.stopPropagation()
    try {
      await userReaction({ post_id: postId, reaction: reaction }).unwrap()
      onReactionChange()
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thực hiện reaction')
    }
    setAnchorEl(null)
  }

  const handleQuickLike = async (event: React.MouseEvent<HTMLElement>) => {
    if (!myReaction) {
      handleReactionClick(event, ReactionType.LIKE)
    } else {
      handleReactionClick(event, ReactionType.NONE)
    }
    
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handleQuickLike}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {myReaction && myReaction !== ReactionType.NONE ? (
          reactionIcons[myReaction]
        ) : (
          <ThumbUpOutlined />
        )}
        <Typography variant="caption" sx={{ ml: 0.5 }}>
          {likeCount}
        </Typography>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        sx={{
          pointerEvents: 'none',
          '& .MuiPopover-paper': {
            pointerEvents: 'auto',
            padding: '4px',
            display: 'flex',
            gap: '4px',
            bgcolor: 'background.paper',
            borderRadius: '30px',
            boxShadow: 3
          }
        }}
      >
        {Object.values(ReactionType)
          .filter((type) => type !== ReactionType.NONE)
          .map((type) => (
            <IconButton
              key={type}
              onClick={(e) => handleReactionClick(e, type)}
              sx={{
                p: '8px',
                '&:hover': {
                  transform: 'scale(1.2)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              {reactionIcons[type]}
            </IconButton>
          ))}
      </Popover>
    </Box>
  )
}
