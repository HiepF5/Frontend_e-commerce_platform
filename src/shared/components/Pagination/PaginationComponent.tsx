import React from 'react'
import { Box, Pagination } from '@mui/material'

interface PaginationComponentProps {
  totalPage: number
  currentPage: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPage,
  currentPage,
  onPageChange
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2
      }}
    >
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={onPageChange}
        color='primary'
      />
    </Box>
  )
}

export default PaginationComponent
