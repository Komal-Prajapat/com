import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import "./index.css"


const loader = <>
<div className="d-flex "
style={{
  justifyContent:"center"
}}
>
<span
className='mx-3'
>Loading
</span>
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
</div>
</>
const ButtonComponent = ({ loading, btn_name, type, onClick }) => {
  

  return (
    
    <button disabled={loading} fullWidth className='loading_btn' type={type} onClick={onClick} >{loading ? loader : btn_name}</button>
 
  
  )
}

export default ButtonComponent;
