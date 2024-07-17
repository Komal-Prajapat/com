import React, { useState } from "react";
import "./index.css"; // Ensure your custom CSS file is correctly imported
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import {
  ImageUrl,
  addtowishlist,
  deleteApiCall,
  deleteFromWishlistApi,
  postApiCall,
} from "../../API/baseUrl";
import { useNavigate } from "react-router-dom";
import Login from "../../Pages/login/login";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { IoAddSharp } from "react-icons/io5";
import { Container } from "react-bootstrap";

const ProductBox = ({
  renderproduct,
  shownav,
  setProductList,
  productList,
  reload,
  setReload,
}) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleDetailPage = (id, name) => {
    const cleanedName = name.replace(/[^\w\s]/gi, "");
    navigate(`/productDetails/${id}/${cleanedName}`);
  };

  const handleLikeToggle = async (id, index, type, userId) => {
    if (userId) {
      try {
        if (type === "remove") {
          await deleteApiCall(`${deleteFromWishlistApi}/${userId}/${id}`);
          const updatedList = renderproduct.filter(
            (item) => item.productId !== id
          );
          setProductList(updatedList);
        } else {
          await postApiCall(addtowishlist, {
            productId: id,
            userId: userId,
          });
        }
        renderproduct[index].is_wishlist = !renderproduct[index].is_wishlist;
        setProductList([...renderproduct]);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      setShowLoginPopup(!showLoginPopup);
    }
  };
  const numProducts = renderproduct.length;
  const getGridProps = (numProducts) => {
    if (numProducts <= 2) {
      return { xs: 12, sm: 6, md: 5 };
    } else {
      return { xs: 12, sm: 6, md: 3 };
    }
  };
  return (
    <>
      <Container className="slider-container">
        <Grid container>
          {renderproduct.map((item, index) => (
            <Grid key={index} {...getGridProps(numProducts)}>
              <div className="product-box">
                <div className="product-img-box">
                  <div className="likebuttonForMobile">
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

                  <img
                    onClick={() =>
                      handleDetailPage(
                        item.productId || item.id,
                        item.product_name || item.productName
                      )
                    }
                    className="product-image"
                    src={`${ImageUrl}/${item.files || item.file}`}
                    alt=""
                  />

                  <div className="product-icons">
                    <p>
                      <ShoppingBagOutlinedIcon
                        disabled={item.is_active === 0}
                        sx={{
                          cursor: item.is_active === 0 ? "no-drop" : "pointer",
                        }}
                        onClick={() =>
                          item.is_active === 0
                            ? ""
                            : handleDetailPage(
                                item.productId || item.id,
                                item.product_name || item.productName
                              )
                        }
                        className="product-icon"
                      />
                    </p>
                    <p>
                      {item.is_wishlist ? (
                        <FavoriteIcon
                          sx={{
                            color: "var(--primary-color)",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleLikeToggle(
                              item.id || item.productId,
                              index,
                              "remove",
                              user_id
                            )
                          }
                          className="product-icon"
                        />
                      ) : (
                        <FavoriteBorderIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            handleLikeToggle(
                              item.id || item.productId,
                              index,
                              "add",
                              user_id
                            )
                          }
                          className="product-icon"
                        />
                      )}
                    </p>
                  </div>
                </div>
                <div
                  className="product-description"
                  style={{ marginTop: "20px" }}
                >
                  {item.is_active === 0 ? (
                    <p className="outofstock test-align">Out Of Stock</p>
                  ) : (
                    ""
                  )}

                  <p
                    className="product_name"
                    onClick={() =>
                      handleDetailPage(
                        item.productId || item.id,
                        item.product_name || item.productName
                      )
                    }
                  >
                    {item.product_name || item.productName}
                  </p>

                  <p className="product-price">
                    {item.discount_percent === 0 ? (
                      <span className="mrp-with-discount product-icon_rs">
                        <CurrencyRupeeIcon
                          style={{ fontSize: "14px", color: "black" }}
                        />{" "}
                        {item.discount_amount || item.price}
                      </span>
                    ) : (
                      <>
                        <span className="mrp-with-discount product-icon_rs">
                          <CurrencyRupeeIcon
                            style={{ fontSize: "14px", color: "black" }}
                          />
                          {item.discount_amount}
                        </span>
                        <strike className="discount_mrp">
                          {item.mrp_amount || item.price}
                        </strike>
                        <span className="discount_percent">
                          {item.discount_percent}% off{" "}
                        </span>
                      </>
                    )}
                  </p>
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
      </Container>
    </>
  );
};

export default ProductBox;
