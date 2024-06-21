import React, { useRef, useState } from "react";
import "./index.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const Slider2 = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(images[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [startIndex, setStartIndex] = useState(0); // Index of the first visible image
  const sliderRef = useRef(null);

  const handleClick = (src) => {
    setHoveredImage(src);
  };

  const handleChevronUpClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleChevronDownClick = () => {
    if (startIndex + 3 < images.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="slider-container">
            <GoChevronUp className="chevron-icon" onClick={handleChevronUpClick} />
            <div className="d-flex flex-wrap" style={{
              height:'300px'
            }}>
              {images.slice(startIndex, startIndex + 3).map((src, index) => (
                <img
                  key={startIndex + index} // Use a unique key
                  src={src} 
                  alt="xyz"
                  className="image img-thumbnail product_img"
                  onClick={() => handleClick(src)}
                  onMouseEnter={() => setHoveredImage(src)}
                  style={{
                    marginBottom: '10px',
                    cursor: 'pointer',
                    width:'80px',
                    height:'80px'
                
                  }}
                />
              ))}
            </div>
            <GoChevronDown className="chevron-icon" onClick={handleChevronDownClick} />
          </div>
        </div>
        <div className="col-md-8 mt-4 mt-md-0">
          {hoveredImage && (
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
                  style={{ width: '100%' }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider2;
