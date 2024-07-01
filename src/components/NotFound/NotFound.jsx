import React from 'react';
import { Link } from 'react-router-dom';
import ButtonForAll from '../ButtonForALL';
import './notfound.css'; 
const NotFound = () => {
  return (
    <div className="error-container">
    <h1>404</h1>
      <span>COMPONENT NOT FOUND</span>
      <h2>Nothing To See Here!</h2>
      
      <p>The page are looking for has been moved or doesn’t exist anymore, if you like you can return to our homepage. If the problem persists, please send us an email to  <a href="mailto:basictheme400@gmail.com">basictheme400@gmail.com</a>.</p>
      <div className="btn" style={{ textDecoration: 'none' , 
      margin:"auto" }}>
      <Link to="/" style={{ textDecoration: 'none' , 
      margin:"auto" }}>
        <ButtonForAll name="Back to home" style/>
      </Link>
      </div>
    </div>
  );
};

export default NotFound;
