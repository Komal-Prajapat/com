import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Your custom CSS file if needed
import ButtonForAll from "../../components/ButtonForALL";

const TwoConSlider = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 d-flex  boxcon" style={{
            padding:'30px',
         marginRight:'10px   ',
         width:'490px'
        }}>
          <div className="textcontainerdiv ">
            <p className="productname">Products Accessories</p>
            <h4>Wooden container Bowl</h4>
            <ButtonForAll name="Buynow"></ButtonForAll>
          </div>
          <div className="">
            <img
              src="https://cdn.images.fecom-media.com/FE00008240/images/HE1478394_153085-P.jpg"
              className="img-fluid twoconimage"
              alt="Responsive image"
            />
          </div>
        </div>

        <div className="col-lg-5 d-flex  boxcon" style={{
            padding:'30px',
            marginRight:'10px   ',
            width:'490px'  
        }}>
          <div className="textcontainerdiv ">
            <p className="productname">Products Accessories</p>
            <h4>Wooden container Bowl</h4>
            <ButtonForAll name="Buynow"></ButtonForAll>
          </div>
          <div className="">
            <img
              src="https://cdn.images.fecom-media.com/FE00008240/images/HE1478394_153085-P.jpg"
              className="img-fluid twoconimage "
              alt="Responsive image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoConSlider;
