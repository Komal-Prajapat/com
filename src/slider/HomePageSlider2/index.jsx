import React from "react";
import "./index.css";
import span from "../../components/ButtonForALL"; // Assuming this is correctly imported

const HoomepageSlider2 = () => {
  return (
    <div className="HomepageSliderCon2 container-fluid">
      <div className="row">
        {/* First Column */}
        <div className="col-12 col-md-4">
          <div className="box box1">
            <div className="box-content">
              <p>Lighting</p>
              <span className="DiscovernowBNT">Discover now</span>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="col-12 col-md-4">
          <div className="box box2">
            <div className="box-content">
              <p>Decoration & Accessories</p>
              <span className="DiscovernowBNT">Discover now</span>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="col-12 col-md-4">
          <div className="box box3">
            <div className="box-content">
              <p>Como and Hair Brush</p>
              <span className="DiscovernowBNT">Discover now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoomepageSlider2;
