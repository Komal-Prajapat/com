import React from 'react'
import { LoadingButton } from "@mui/lab";
import "./index.css"
import { ThreeDots } from 'react-loader-spinner';


const loader = <>
  Loading
  <ThreeDots
    height="20"
    width="20"
    radius="9"
    color="var(--white)"
    wrapperStyle={{}}
    ariaLabel="three-dots-loading"
    wrapperClassName=""
    visible={true}
  />
</>
const ButtonComponent = ({ loading, disabled, btn_name, type, fullWidth, onClick}) => {
  

  return (
    
    <button onClick={onClick} disabed={loading || disabled} className='loading_btn' type={type}>{loading ? loader : btn_name}</button>
 
  
  )
}

export default ButtonComponent;
