import React, { useRef, useState } from "react";
import "./index.css"; 

const Slider2 = () => {
  const images = [
    "https://ng-outstock.vercel.app/assets/img/shop/product/product_3.png",
    "https://ng-outstock.vercel.app/assets/img/shop/product/product_4.png",
    "https://ng-outstock.vercel.app/assets/img/shop/product/product_5.png",
  ];

  const [hoveredImage, setHoveredImage] = useState(images[0]);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);

  const handleClick = (src) => {
    setHoveredImage(src);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 " >
          <div className="slider-container ">
            <div className="d-flex flex-wrap ">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt=""
                  className="image img-thumbnail product_img"
                  onClick={() => handleClick(src)}
                  style={{
          marginTop:'10px'
        }}
                />
              ))}
            </div>
          </div>
        </div>
        {hoveredImage && (
          <div className="col-md-8 mt-4 mt-md-0">
            <div
              className="hovered-image-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="hovered-image-container">
                <img
                  src={hoveredImage}
                  alt="Hovered"
                  className="img-fluid hovered-image"
                
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider2;
