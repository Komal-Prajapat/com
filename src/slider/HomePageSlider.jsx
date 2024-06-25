import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './homepageSlider.css';
import ButtonForAll from '../components/ButtonForALL';

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
        interval={3000} // Auto slide every 3 seconds
        controls={false} // Hide prev/next controls
        indicators // Show slide indicators (dots)
        pause={false} // Do not pause on hover
        className="HomePageSliderCon"
      >
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text">
              <h2 className='sliderheading'>Lorem ipsum .</h2>
              <p data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum eaque culpa nemo quae odit quasi delectus, ducimus magni
                necessitatibus error iure, tempore cumque ex.
              </p>
              <ButtonForAll name="Discover now" data-aos="fade-up"></ButtonForAll>
            </div>
            <img
              className="d-block w-100"
              src="https://ng-outstock.vercel.app/assets/img/slider/slider-2.jpg"
              alt="First slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text">
              <h2 className='sliderheading'>Lorem ipsum dolo</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum eaque culpa nemo quae odit quasi delectus, ducimus magni
                necessitatibus error iure, tempore cumque ex.
              </p>
              <ButtonForAll name="Discover now"></ButtonForAll>
            </div>
            <img
              className="d-block w-100"
              src="https://ng-outstock.vercel.app/assets/img/slider/slider-3.jpg"
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-content">
            <div className="content-text">
              <h2 className='sliderheading'>Lorem ipsum </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum eaque culpa nemo quae odit quasi delectus, ducimus magni
                necessitatibus error iure, tempore cumque ex.
              </p>
              <ButtonForAll name="Discover now"></ButtonForAll>
            </div>
            <img
              className="d-block w-100"
              src="https://ng-outstock.vercel.app/assets/img/slider/slider-1.jpg"
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
