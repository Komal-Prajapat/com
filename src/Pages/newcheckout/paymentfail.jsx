import React from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom';

import ErrorIcon from '@mui/icons-material/Error';

const Paymentfail = () => {
    const navigate = useNavigate();

	const Continueorder = () => {
		navigate("/checkout")
	}

  return (
    <div className='failure_container'>
        <div className='failure_container_fuild'>
             <ErrorIcon sx={{color:"red",fontSize:"62px"}}/>
             <h5>Payment Failed</h5>
             <button type='button' onClick={Continueorder} className='login_continue_btn'>Go Back</button>
        </div>
    </div>
  )
}

export default Paymentfail