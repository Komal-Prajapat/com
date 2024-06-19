import React from 'react'
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Paymentdone = () => {
    const navigate = useNavigate();

	const Continueorder = () => {
		navigate("/")
	}

  return (
    <div className='failure_container'>
        <div className='empty_checkout_dialog'>
							<CheckCircleIcon sx={{color:"green", fontSize:"62px"}}/>
							<h5>Your Order Placed</h5>
							<button type='button' onClick={Continueorder} className='login_continue_btn' >Continue Shoping</button>
						</div>
    </div>
  )
}

export default Paymentdone