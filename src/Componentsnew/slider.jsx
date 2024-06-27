import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  ImageUrl,
  addtowishlist,
  deleteApiCall,
  deleteFromWishlistApi,
  postApiCall,
} from "../API/baseUrl";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/login/login";
import "./slider.css"; // Your custom CSS file
import { IoAddSharp } from "react-icons/io5";

const SliderComponent = ({
  reload,
  setReload,
  newarrivalList,
  setNewarrivalList,
}) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  // State to store secondary images
  const [secondaryImages, setSecondaryImages] = useState({});

  const handleDetailPage = (id, name) => {
    const cleanedName = name.replace(/[^\w\s]/gi, "");
    navigate(`/productDetails/${id}/${cleanedName}`);
  };

  const handleLikeToggle = async (id, index, type, userId) => {
    if (userId) {
      try {
        if (type === "remove") {
          await deleteApiCall(`${deleteFromWishlistApi}/${userId}/${id}`);
          const updatedList = newarrivalList.filter(
            (item) => item.productId !== id
          );
          setNewarrivalList(updatedList);
        } else {
          await postApiCall(addtowishlist, {
            productId: id,
            userId: userId,
          });
        }
        newarrivalList[index].is_wishlist = !newarrivalList[index].is_wishlist;
        setNewarrivalList([...newarrivalList]);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      setShowLoginPopup(!showLoginPopup);
    }
  };

  const handleImageHover = (index, isHovering) => {
    setSecondaryImages((prevImages) => ({
      ...prevImages,
      [index]: isHovering
        ? `${ImageUrl}/${newarrivalList[index].secondary_image}`
        : null,
    }));
  };

  const truncateProductName = (name, maxLength) => {
    if (name.length > maxLength) {
      return `${name.substring(0, maxLength)}...`;
    }
    return name;
  };

  return (
    <div className="slider-container">
      <Grid container spacing={3}>
        {newarrivalList.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <div className="product-box">
              <div className="product-img-box">
                <img
                  onMouseEnter={() => handleImageHover(index, true)}
                  onMouseLeave={() => handleImageHover(index, false)}
                  onClick={() =>
                    handleDetailPage(
                      item.productId || item.id,
                      item.product_name || item.productName
                    )
                  }
                  className="product-image"
                  src={
                    secondaryImages[index] ||
                    `${ImageUrl}/${item.files || item.file}`
                  }
                  alt=""
                
                />
                <div className="product-icons">
                  <p>
                    <ShoppingBagOutlinedIcon
                      className="product-icon"
                      onClick={() =>
                        handleDetailPage(
                          item.productId || item.id,
                          item.product_name || item.productName
                        )
                      }
                    />
                  </p>
                  {item.is_wishlist ? (
                    <p>
                      <FavoriteIcon
                        className="product-icon"
                        onClick={() =>
                          handleLikeToggle(
                            item.id || item.productId,
                            index,
                            "remove",
                            user_id
                          )
                        }
                      />
                    </p>
                  ) : (
                    <p>
                      <FavoriteBorderIcon
                        className="product-icon"
                        onClick={() =>
                          handleLikeToggle(
                            item.id || item.productId,
                            index,
                            "add",
                            user_id
                          )
                        }
                      />
                    </p>
                  )}
                </div>
              </div>
              <div
                className="product-description"
                style={{ marginTop: "20px" }}
              >
                <p
                  className="product-name"
                  onClick={() =>
                    handleDetailPage(
                      item.productId || item.id,
                      item.product_name || item.productName
                    )
                  }
                >
                  {truncateProductName(
                    item.product_name || item.productName,
                    15
                  )}
                </p>
                <p className="product-price">
                  {item.discount_percent === 0 ? (
                    <span className="mrp-with-discount product-icon_rs">
                      <CurrencyRupeeIcon  style={{fontSize:'14px'}}/>{" "}
                      {item.discount_amount || item.price}
                    </span>
                  ) : (
                    <>
                      <span className="mrp-with-discount product-icon_rs">
                        <CurrencyRupeeIcon style={{fontSize:'14px'}}/>
                        {item.discount_amount}
                      </span>
                      <strike className="discount-mrp">
                        {item.mrp_amount || item.price}
                      </strike>
                      <span className="discount-percent">
                        {item.discount_percent}% off
                      </span>
                    </>
                  )}
                </p>
                {/* <div className="addtocart">
                  <IoAddSharp /> <span> Add to cart</span>
                </div> */}
                
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      {showLoginPopup && (
        <Login
          showloginpopup={showLoginPopup}
          setShowloginpopup={setShowLoginPopup}
          {...{ reload, setReload }}
        />
      )}
    </div>
  );
};

export default SliderComponent;
