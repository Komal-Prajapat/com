
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import "react-image-gallery/styles/css/image-gallery.css";

function SimpleDialog({onClick, showmodal}) {

	return (
		<Dialog className='modal_dialog'
			 open={showmodal}
		>
			<div>
				<div className='imagegallery_container'>
				<CloseIcon onClick={onClick} className='cl_btn_modal'/>
					<img src="image/teddy.jpg" alt=''/>
				</div>
			</div>
		</Dialog>
	);
}
export default SimpleDialog;