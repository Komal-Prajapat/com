import React from "react";
import "./index.css";
import ButtonForAll from "../../components/ButtonForALL";

const HoomepageSlider2 = () => {
  return (
    <div className=" HomepageSliderCon2">
      <div className="row">
        {/* First Column */}
        <div className="col-12 col-md-4">
          <div className="box box1">
            <div className="box-content">
              <p>Lighting & Chair</p>
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
              <p>Clothing & Oil</p>
              <span className="DiscovernowBNT">Discover now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoomepageSlider2;
