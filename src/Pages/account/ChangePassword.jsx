import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleChangePassword = () => {
    // Implement logic to change the password
    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match.');
    } else {
      setMessage('Password changed successfully!');
      // Call API to change the password in the backend
      // Reset the password fields to empty
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  return (
    <div className='change-password'>
      <h3>Change Password</h3>
      <div>
        <label>Current Password:</label>
        <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input type="password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
      <div>{message}</div>

      <section className="sec-relate-product bg0 p-t-10 p-b-60">
					{/* <div className="container"> */}
					<div className="p-b-10">
						<h3 className="ltext-106 cl5 p-l-15">
							Related Products
						</h3>
					</div>


					<div className="wrap-slick2">
						<div className="slick2">
							<div className="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
								<div className='mbl_product_container'>
									{/* <ProductCard renderproduct={productList} shownav={shownav} /> */}
								</div>

								{/* <Products ProductsHeading={RelatedHeading} filter={filter} /> */}
								{/* <ProductCard renderproduct={productList} filter={filter} /> */}

							</div>

						</div>
					</div>
					{/* </div> */}

					{/* {showmodal ? <SimpleDialog onClick={openmodal} showmodal={showmodal} /> : ""} */}
					{/* {showloginpopup ? <Login showloginpopup={showloginpopup} setShowloginpopup={setShowloginpopup} /> : ""} */}
				</section>
    </div>
  );
};

export default ChangePassword;

