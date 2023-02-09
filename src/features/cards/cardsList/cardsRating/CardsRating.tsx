import * as React from 'react'

import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

export const CardsRating = ({ grade }: { grade: number }) => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="read-only" value={grade} readOnly />
    </Box>
  )
}
