import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonForAll from "../../components/ButtonForALL";
import TopPageImage from "../../components/toppageimage";

const Empty = ({emptyorderlist}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/product");
  };

  return (
    <>
     
      <div className="empty_container">
        <div className="empty_container_fluid">
     
          <img src="https://cdn.dribbble.com/users/9620200/screenshots/17987839/media/fd60cc8251e50a8c54d3dde620ff9460.jpg?resize=800x600&vertical=center" alt="" style={{
            
          }}/>
          <h1>No Cart Items Found</h1>
        </div>

        {/* Link wrapper around the button */}
        <Link to="/product" style={{ textDecoration: 'none' }}>
          <div className="shopnow" style={
            {
              marginTop:"10px",
              marginBottom:"20px"
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
