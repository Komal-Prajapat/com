import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonForAll from "../../components/ButtonForALL";
import TopPageImage from "../../components/toppageimage";

const Empty = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/product");
  };

  return (
    <>
     
      <div className="empty_container">
        <div className="empty_container_fluid">
          {/* <h3>No Cart Items Found</h3> */}
        </div>

        {/* Link wrapper around the button */}
        <Link to="/product" style={{ textDecoration: 'none' }}>
          <div className="shopnow" style={
            {
              marginTop:"30px"
            }
          }>
            <ButtonForAll name="Shop Now" onClick={handleButtonClick} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Empty;
