import React from 'react'
import { Skeleton } from '@mui/material';
import "./skeleton.css";

const SkeletonProductDetails = () => {
    return (
        <Skeleton variant="rectangular" className='productdetail_container_skeleton'>
                <Skeleton variant="rectangular" minWidth={400}  height={550} sx={{backgroundColor:"#000000"}}/>

             <div></div>
        </Skeleton>			
  )
}

export default SkeletonProductDetails