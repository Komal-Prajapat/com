import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import "./index.css"


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
const ButtonComponent = ({ loading, btn_name, type, onClick }) => {
  

  return (
    
    <button disabled={loading} fullWidth className='loading_btn' type={type} onClick={onClick} >{loading ? loader : btn_name}</button>
 
  
  )
}

export default ButtonComponent;
