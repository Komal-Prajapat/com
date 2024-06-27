import React from "react";
import "./index.css";

const ButtonForAll = ({ name, backgroundColor, textColor, onClick }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor, 
    color: textColor || "black", 
  };

  return (
    <button className="custom-button" style={buttonStyle} onClick={onClick}>
      {name}
      <div className="innercontainer" >{name}</div>
    </button>
  );
};

export default ButtonForAll;
