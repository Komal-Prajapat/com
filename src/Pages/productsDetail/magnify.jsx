import React, { useState } from "react";

import ReactImageMagnify from "react-image-magnify";

const MyReactImageMagnify = (props) => {
  const [imageurl, setImageurl] = useState(props.images[0]?.original)


  const handleimagechange = (value) => {
    setImageurl(value)
  }

  return (
    <div className="productImageContainer">
      <div className="tumbContainer">
        {props.images?.map((item, index) => {
          return (
            <img className={`${item.original === imageurl ? "activeImage" : "deActiveImage"} `} src={item.original} alt="img-product" height={50} width={50} onClick={() => { handleimagechange(item.original) }} />
          )
        })}
      </div>
      <ReactImageMagnify
      className="reactImage_con"
        {...props}
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: imageurl,
          },
          largeImage: {
            src: imageurl,
            width: 1000,
            height: 480,
          },
          enlargedImageContainerStyle: {
            zIndex: "1500",
          },
          enlargedImageContainerDimensions: {
            width: "100%",
            height: "70%",
          },
        }}
      />
    </div>
  );
};

export default MyReactImageMagnify;


// import React, { useState } from 'react';
// import './index.scss'; // Import your SCSS file

// const ZoomableImage = ({ imageUrl, config }) => {
//     const [zoomed, setZoomed] = useState(false);
//     const [zoom, setZoom] = useState(config.initialZoom);

//     const handleMouseover = () => {
//         if (!zoomed) {
//             setZoomed(true);
//         }
//     };

//     const handleMousemove = (evt) => {
//         if (zoomed) {
//             const el = evt.currentTarget;
//             const elPos = el.getBoundingClientRect();

//             const percentageX = `${((evt.clientX - elPos.left) * 100) / elPos.width}%`;
//             const percentageY = `${((evt.clientY - elPos.top) * 100) / elPos.height}%`;

//             el.style.setProperty('--zoom-pos-x', percentageX);
//             el.style.setProperty('--zoom-pos-y', percentageY);
//         }
//     };

//     const handleMouseout = () => {
//         if (zoomed) {
//             setZoomed(false);
//             setZoom(config.initialZoom);
//         }
//     };

//     const handleWheel = (evt) => {
//         if (zoomed) {
//             evt.preventDefault();
//             const newZoom = zoom + evt.deltaY * (config.zoomSpeed * -1);
//             const { minZoom, maxZoom } = config;

//             setZoom(Math.max(Math.min(newZoom, maxZoom), minZoom));
//         }
//     };

//     return (
//         <div
//             className={`zoomable ${zoomed ? 'zoomable--zoomed' : ''}`}
//             onMouseOver={handleMouseover}
//             onMouseMove={handleMousemove}
//             onMouseOut={handleMouseout}
//             onWheel={handleWheel}>
//             <img className="zoomable__img" src={imageUrl} alt="" style={{ '--zoom': zoom }} />
//         </div>
//     );
// };

// ZoomableImage.defaultProps = {
//     config: {
//         initialZoom: 3,
//         minZoom: 1.25,
//         maxZoom: 4,
//         zoomSpeed: 0.01
//     }
// };

// export default ZoomableImage;
