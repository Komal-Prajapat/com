import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import SimpleDialog from "../../Pages/productsDetail/modal";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  ImageUrl,
  addtowishlist,
  deleteApiCall,
  deleteFromWishlistApi,
  postApiCall,
} from "../../API/baseUrl";
import Login from "../../Pages/login/login";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ProductCard = ({
  renderproduct,
  shownav,
  setProductList,
  productList,
  reload,
  setReload,
}) => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [showloginpopup, setShowloginpopup] = useState(false);

  const closeModel = () => {
    setShowDetails(!showDetails);
  };
  const handlelikeremove = async (id, index, type, user_id) => {
    if (user_id) {
      renderproduct[index].is_wishlist = !renderproduct[index].is_wishlist;
      setProductList([...renderproduct]);
      try {
        if (type === "remove") {
          await deleteApiCall(`${deleteFromWishlistApi}/${user_id}/${id}`);
          const maydata = productList.filter((item) => item.productId !== id);
          setProductList(maydata);
        } else {
          await postApiCall(addtowishlist, {
            productId: id,
            userId: user_id,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setShowloginpopup(!showloginpopup);
    }
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDetailPage = (id) => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <>
      <div
        className={`product_grid ${
          shownav ? "productflex " : "grid_container_product"
        } `}
      >
        {renderproduct.map((product, index) => {
          return (
            <div className="isotope-item women product_card_container">
              {/* <!-- Block2 --> */}
              <div className={`block2 ${shownav ? "pro_container" : ""} `}>
                <div className="block2-pic hov-img0 Product_container">
                  <div className="block2-txt-child2 flex-r p-t-3 like_icon-div">
                    {product.is_wishlist ? (
                      <FavoriteIcon
                        sx={{
                          color: "var(--primary-color)",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          handlelikeremove(
                            product.id ? product.id : product.productId,
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
                          handlelikeremove(
                            product.id ? product.id : product.productId,
                            index,
                            "add",
                            user_id
                          )
                        }
                      />
                    )}
                  </div>

                  <div className="image_container_product">
                    <div
                      class="product-img"
                      onClick={() =>
                        handleDetailPage(
                          product.productId ? product.productId : product.id
                        )
                      }
                    >
                      <img
                        src={`${ImageUrl}${
                          product.file ? product.file : product.files
                        }`}
                        alt="front product img"
                        class="main-img"
                      />
                      <img
                        src={`${ImageUrl}${product?.secondary_image}`}
                        alt=""
                        class="rear-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="block2-txt flex-w flex-t p-t-5">
                  <div className="block2-txt-child1 flex-col-l ">
                    <p className="stext-104 hov-cl1 trans-04 js-name-b2 C_pointer product_card_product_name">
                      {product.productName
                        ? product.productName
                        : product.product_name}
                    </p>

                    <span className="stext-105 text_name">
                      <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                      {product.mrp_amount}/-
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showDetails ? (
        <SimpleDialog showDetails={showDetails} onClick={closeModel} />
      ) : (
        ""
      )}

      {showloginpopup ? (
        <Login
          showloginpopup={showloginpopup}
          setShowloginpopup={setShowloginpopup}
          {...{ reload, setReload }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductCard;
