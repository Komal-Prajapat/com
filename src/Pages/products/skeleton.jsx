import { Skeleton } from '@mui/material';
import React from 'react'
import "./index.css"

const ProductpageSkeleton = () => {
  return (           
     <div className='skeleton_container'>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" minWidth={400}  height={150} sx={{backgroundColor:"#e0e0e0"}}/>
    </div>
  )
}

export default ProductpageSkeleton;