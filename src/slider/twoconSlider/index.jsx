import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Your custom CSS file if needed
import ButtonForAll from "../../components/ButtonForALL";

const TwoConSlider = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mb-4 boxcon d-flex" style={{ padding: '30px' ,marginRight:"12px"}}>
          <div className="textcontainerdiv">
            <span className="productname">Products Accessories</span>
            <h4>Wooden Container Bowl</h4>
            <div className="buynowbtn">
            <ButtonForAll name="Buy Now"  />
            </div>
          </div>
          <div className="">
            <img
              src="https://cdn.images.fecom-media.com/FE00008240/images/HE1478394_153085-P.jpg"
              className="img-fluid twoconimage"
              alt="Product Image"
            />
          </div>
        </div>

        <div className="col-lg-5 mb-4 boxcon d-flex" style={{ padding: '30px' }}>
          <div className="textcontainerdiv">
            <span className="productname">Products Accessories</span>
            <h4>Wooden container Bowl</h4>
            <div className="buynowbtn">
            <ButtonForAll name="Buy now"  />
            </div>
          </div>
          <div className="">
            <img
              src="https://cdn.images.fecom-media.com/FE00008240/images/HE1478394_153085-P.jpg"
              className="img-fluid twoconimage"
              alt="Product Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoConSlider;
