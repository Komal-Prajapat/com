import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    console.log("page not found")
  return (
    <div className="error-container">
      <h2>404 Error: Nothing To See Here!</h2>
      <p>The page you are looking for has been moved or doesn't exist anymore.</p>
      <p>If you like, you can return to our <Link to="/">homepage</Link>.</p>
      <p>If the problem persists, please send us an email to <a href="mailto:basictheme400@gmail.com">basictheme400@gmail.com</a>.</p>
    </div>
  );
};

export default NotFound;
