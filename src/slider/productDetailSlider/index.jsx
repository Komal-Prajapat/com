import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { GrFormNext } from "react-icons/gr";
import ReactImageMagnify from 'react-image-magnify';

const Slider2 = ({ images }) => {
  const [hoveredImage, setHoveredImage] = useState(images[0]);
  const [startIndex, setStartIndex] = useState(0); // Index of the first visible image
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the device width is less than 768px (standard tablet/mobile breakpoint)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check when component mounts
    checkIfMobile();

    // Event listener to update on window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

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
      <div className="row silderrow">
        <div className="col-lg-4 col-md-6">
          <div className="slider-container">
            {isMobile ? (
              <GrFormNext className="chevron-icon" onClick={handleChevronUpClick} />
            ) : (
              <GoChevronUp className="chevron-icon" onClick={handleChevronUpClick} />
            )}
            <div className="d-flex flex-wrap  image_Con"
             style={{
              justifyContent:'center'
             }}>
              {images.slice(startIndex, startIndex + 4).map((src, index) => (
                <img
                  key={startIndex + index} // Use a unique key
                  src={src} 
                  alt="xyz"
                  className="image img-thumbnail"
                  onClick={() => handleClick(src)}
                />
              ))}
            </div>
            {isMobile ? (
              <GrFormNext className="chevron-icon" onClick={handleChevronDownClick} />
            ) : (
              <GoChevronDown className="chevron-icon" onClick={handleChevronDownClick} />
            )}
          </div>
        </div>
        <div className="col-lg-8 col-md-6 mt-4 mt-md-0">
      {hoveredImage && (
        <div className="hovered-image-wrapper">
          <ReactImageMagnify {...{
            smallImage: {
              alt: 'Hovered',
              isFluidWidth: true,
              src: hoveredImage
            },
            largeImage: {
              src: hoveredImage,
              width: 1200,
              height: 1800
            }
          }} />
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default Slider2;
