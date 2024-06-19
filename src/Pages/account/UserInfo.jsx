import React, { useState } from 'react';

const UserInfo = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [address, setAddress] = useState('123 Main St');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to the backend
    console.log('Changes saved!');
  };

  return (
    <div>
      <h3>User Information</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={address} onChange={handleAddressChange} />
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default UserInfo;