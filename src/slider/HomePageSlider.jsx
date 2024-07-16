import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./homepageSlider.css";
import ButtonForAll from "../components/ButtonForALL";
import secondbanner from "../Assect/bannerImage/secong_banner.png";
import first from "../Assect/bannerImage/First_banner.jpeg";

function DarkVariantExample() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="sliderCon">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}
        controls={false} // Hide prev/next controls
        indicators // Show slide indicators (dots)
        pause={false} // Do not pause on hover
        className="HomePageSliderCon"
      >
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text"></div>
            <img
              className="d-block w-100"
              src={secondbanner}
              alt="Second slide"
            />
          </div>  
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text"></div>
            <img className="d-block w-100" src={first} alt="Third slide" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
