import React from "react";
import "./index.css";

const ButtonForAll = ({ name }) => {
  return (
    <button className="custom-button">
   {name}
      <div className="innercontainer">{name}</div>
    </button>
  );
};

export default ButtonForAll;
