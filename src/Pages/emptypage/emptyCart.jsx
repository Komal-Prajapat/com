import React from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';

const Empty = ({image,btn,text}) => {
  const navigate = useNavigate();

  const handlebuttonclick = () => {
    navigate("/product")
};

  return (
    <div className='empty_container'>
         <div className='empty_container_fluid'>
                {/* <img src={image} alt=''   height={250} width={250}/> */}
                <img src={image} alt=''  />
         </div>
         {/* <h1>{text}</h1> */}
         <button className='login_continue_btn' onClick={handlebuttonclick}>{btn}</button>

         
    </div>
  )
}

export default Empty