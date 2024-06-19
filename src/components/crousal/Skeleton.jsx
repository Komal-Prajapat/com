import { Skeleton } from '@mui/material'
import React from 'react'

const SliderSkeleton = () => {
  return (
    <div>
        <Skeleton variant="rectangular" width="100%" height={500} sx={{borderRadius:"10px",backgroundColor:"#e0e0e0"}}/>
    </div>
  )
}

export default SliderSkeleton;