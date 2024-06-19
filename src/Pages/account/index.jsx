
import React, { useState } from 'react';
import UserInfo from './UserInfo';
import OrderHistory from './OrderHistory';
import ChangePassword from './ChangePassword';
import "./index.jsx";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('userInfo');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='account-page'>
      <h2>Account Page</h2>
      <div>
        <button onClick={() => handleTabChange('userInfo')}>User Information</button>
        <button onClick={() => handleTabChange('orderHistory')}>Order History</button>
        <button onClick={() => handleTabChange('changePassword')}>Change Password</button>
      </div>
      <div>
        {activeTab === 'userInfo' && <UserInfo />}
        {activeTab === 'orderHistory' && <OrderHistory />}
        {activeTab === 'changePassword' && <ChangePassword />}
      </div>
    </div>
  );
};

export default AccountPage;