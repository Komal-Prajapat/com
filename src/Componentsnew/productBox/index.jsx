import React, { useState } from "react";
import "./index.css"; // Ensure your custom CSS file is correctly imported
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
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

  return (
    <>
      <div className="product_grid">
        {renderproduct.map((item, index) => (
          <div className="product_box" key={index}>
            <div className="product_img_box">
              <div className="product_img">
                <img
                  onClick={() =>
                    handleDetailPage(
                      item.productId || item.id,
                      item.product_name || item.productName
                    )
                  }
                  className="product_image"
                  src={`${ImageUrl}/${item.files || item.file}`}
                  alt=""
                />
              </div>
              <div className="product_icon">
                <ul>
                  <li>
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
                    />
                  </li>
                  <li>
                    {item.is_wishlist ? (
                      <FavoriteIcon
                        sx={{ color: "var(--colorprimary)", cursor: "pointer" }}
                        onClick={() =>
                          handleLikeToggle(
                            item.id || item.productId,
                            index,
                            "remove",
                            user_id
                          )
                        }
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
                      />
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div className="product_box_description">
              {item.is_active === 0 ? (
                <p className="outofstock test-align">Out Of Stock</p>
              ) : (
                ""
              )}
              <li className="product_name_con">
                <span
                  className="product_name"
                  onClick={() =>
                    handleDetailPage(
                      item.productId || item.id,
                      item.product_name || item.productName
                    )
                  }
                >
                  {item.product_name || item.productName}
                </span>
              </li>

              <li className="product_price">
                {item.discount_percent === 0 ? (
                  <span className="mrpwithdiscount">
                    <CurrencyRupeeIcon
                      style={{
                        fontSize: "14px",
                        color: "black",
                      }}
                    />{" "}
                    {item.discount_amount || item.price}
                  </span>
                ) : (
                  <>
                    <span className="mrpwithdiscount">
                      <CurrencyRupeeIcon
                        style={{
                          fontSize: "14px",
                          color: "black",
                        }}
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
              </li>

              {/* <div className="addtocart">
                             
                            <IoAddSharp />  <span> Add to cart</span>
                            </div> */}
            </div>
          </div>
        ))}
        {showLoginPopup && (
          <Login
            showloginpopup={showLoginPopup}
            setShowloginpopup={setShowLoginPopup}
            {...{ reload, setReload }}
          />
        )}
      </div>
    </>
  );
};

export default ProductBox;
