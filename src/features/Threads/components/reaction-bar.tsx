import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import {
  ThumbUp,
  Favorite,
  EmojiEmotions,
  SentimentVeryDissatisfied,
  Mood,
  SentimentVeryDissatisfied as AngryIcon
} from '@mui/icons-material'
import { Reaction } from '../types/threads.interface'

interface ReactionBarProps {
  reactions: Reaction[]

  onReact: (type: Reaction['type'], e: React.MouseEvent) => void
}

export function ReactionBar({ reactions, onReact }: ReactionBarProps) {
  const getReactionCount = (type: Reaction['type']) => {
    const reaction = reactions.find((r) => r.type === type)
    return reaction ? reaction.count : 0
  }

  const reactionIcons = {
    like: ThumbUp,
    love: Favorite,
    haha: EmojiEmotions,
    wow: Mood,
    sad: SentimentVeryDissatisfied,
    angry: AngryIcon
  }

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Box>
        {Object.entries(reactionIcons).map(([type, Icon]) => (
          <IconButton
            key={type}
            onClick={(e) => onReact(type as Reaction['type'], e)}
            color={
              getReactionCount(type as Reaction['type']) > 0
                ? 'primary'
                : 'default'
            }
          >
            <Icon fontSize='small' />
          </IconButton>
        ))}
      </Box>
      <Typography variant='body2' color='text.secondary'>
        {reactions.reduce((sum, reaction) => sum + reaction.count, 0)} reactions
      </Typography>
    </Box>
  )
}
