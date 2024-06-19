
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Card, Grid, } from '@mui/material';
import "./index.css"
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';



function SuccessDialog ({ successDialog, setSuccessDialog ,orderId}) {
	const navigate = useNavigate();

	const gotocart = () => {
		setSuccessDialog(false)
		navigate("/")
	}

	
	return (
		<>
			{/* <div className='emptyorder_container'>

				<Card className='empty_card_placeorder'>
					<div className='order_login_contain'>
						<div className='step_contain'><p>1</p></div>
						<div className='login_number_container'>
							<h4>LOGIN <CheckIcon sx={{ color: "#1c13e7" }} /></h4>
						</div>
					</div>
				</Card>


				<Card className='empty_card_placeorder'>
					<div className='order_login_contain'>
						<p>2</p>
						<div className='login_number_container'>
							<h4>DELIVERY ADDRESS <CheckIcon sx={{ color: "#1c13e7" }} /></h4>
						</div>
					</div>
				</Card>


				<Card className='empty_card_placeorder'>
					<div className='order_login_contain'>
						<p>3</p>
						<div className='login_number_container'>
							<h4>ORDER SUMMARY</h4>
						</div>
					</div>
				</Card>

				<Card className='empty_card_placeorder'>
					<div className='order_login_contain'>
						<p>4</p>
						<div className='login_number_container'>
							<h4>PAYMENT OPTION</h4>
						</div>
					</div>
				</Card>
			</div> */}

			<div className='empty_checkout_container'>
				<Dialog className='modal_dialog'
					open={successDialog}
				>
					<Box sx={{ p: "50px", backgroundColor: "#ffffff", width:"100%" }}>

						<div className='empty_checkout_dialog'>
							<CheckCircleIcon sx={{color:"green",fontSize:"62px"}}/>
							<h5 className='center-text'>Your Order Placed</h5>
							<p>Your Order Id is : {orderId}</p>
							
							<button type='button' onClick={gotocart} className='login_continue_btn' >Continue Shoping</button>
						</div>

					</Box>

				</Dialog>
			</div>
		</>

	);
}
export default SuccessDialog;