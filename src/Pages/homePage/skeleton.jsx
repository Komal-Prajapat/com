import { Skeleton } from '@mui/material';
import React from 'react'

const ProductSkeleton = () => {
  return (
       <div>
        <Skeleton variant="rectangular" width="100%" height={225} sx={{backgroundColor:"#e0e0e0"}}/>
    </div>
  )
}

export default ProductSkeleton;

