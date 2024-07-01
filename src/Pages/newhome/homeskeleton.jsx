import React from 'react'
import { Skeleton } from '@mui/material';
import "./index.css"
import Loader from '../../components/loader';

const Homeskeleton = () => {
  return (
    <>
       <div className='homeskeleton'>
        <div className='homeskeleton_container_inside'>
        <Skeleton variant="rectangular" width={900}  height={300} sx={{backgroundColor:"#e0e0e0"}}/>
        {/* <Skeleton variant="rectangular" width={900}  height={300} sx={{backgroundColor:"#e0e0e0"}}/> */}
        </div>
        {/* <div className='aligncenter'>
       
        <Skeleton variant="rectangular" width={250}  height={50} sx={{backgroundColor:"#e0e0e0"}}/></div> */}


        <div className='homeskeleton_container_inside'>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
      
        </div>
<div className="home_body_product_container">
        <Skeleton variant="rectangular" width={115}  height={10} sx={{backgroundColor:"#e0e0e0" ,
        margin:"auto",
        justifyContent:"center" }}/>

</div>
        <div className='homeskeleton_container_inside'>
        <Skeleton variant="rectangular" width={600}  height={300} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" width={600}  height={300} sx={{backgroundColor:"#e0e0e0"}}/>
        </div>
        <div className='aligncenter'><Skeleton variant="rectangular" width={250}  height={50} sx={{backgroundColor:"#e0e0e0"}}/></div>
       
        <div className='homeskeleton_container_inside'>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
        <Skeleton variant="rectangular" width={215}  height={220} sx={{backgroundColor:"#e0e0e0"}}/>
        </div>
  </div>
  <div className='loader_container'>
    <Loader/>
  </div>
    </>
 
  )
}

export default Homeskeleton;