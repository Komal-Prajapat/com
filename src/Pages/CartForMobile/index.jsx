import React, { useEffect } from "react";

import Empty from "../emptypage/emptyCart";
import { RiSubtractLine } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import TopPageImage from "../../components/toppageimage";
// import ButtonForAll from '../components/ButtonForALL';
import {
  ImageUrl,
  deleteApiCall,
  deleteFromcartApi,
  getApiCall,
  getcartApi,
  getdeliverycharge,
  postApiCall,
  quantitydecApi,
  quantityincApi,
} from "../../API/baseUrl";
import ToastMessage from "../../utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loader from "../../components/loader";
import emptycartlist from "../../Assect/cartempt.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ButtonComponent from "../../components/button";
import ButtonForAll from "../../components/ButtonForALL";
import { WidthFull } from "@mui/icons-material";

const CartForMobile = ({ reload, setReload }) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [deliveryCharge, setDeliveryCharge] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState("");

  // Function to fetch cart data
  const getCart = async () => {
    setPending(true);
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setPrice(result?.data?.cartTotalPrice);
        setDeliveryCharge(result?.data?.deliveryCharges);
        setDiscount(result?.data?.discount);
        setTotalPrice(result?.data?.totalCartValue);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false);
    }
  };

  // Function to refresh cart data
  const refreshCart = async () => {
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setPrice(result?.data?.cartTotalPrice);
        setDeliveryCharge(result?.data?.deliveryCharges);
        setDiscount(result?.data?.discount);
        setTotalPrice(result?.data?.totalCartValue);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // Function to handle increment quantity
  const handlePlus = async (id, index) => {
    setLoading(true);
    try {
      const result = await postApiCall(quantityincApi, {
        id: id,
        userId: user_id,
      });
      if (result?.data?.status) {
        setLoading(false);
        data[index].quantity = data[index].quantity + 1;
        setData([...data]);
        setReload(!reload);
        refreshCart();
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle decrement quantity
  const handleMinus = async (id, quantity, index) => {
    if (quantity === 1) {
      // Handle if quantity is 1
    } else {
      setLoading(true);
      try {
        const result = await postApiCall(quantitydecApi, {
          id: id,
          userId: user_id,
        });
        if (result?.data?.status) {
          setLoading(false);
          data[index].quantity = data[index].quantity - 1;
          setData([...data]);
          refreshCart();
          setReload(!reload);
        } else {
          ToastMessage("error", result.data.message);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to navigate to product details page
  const goToDetails = (id, name) => {
    navigate(`/productDetails/${id}/${name}`);
  };

  // Function to delete item from cart
  const deleteFromCartAlert = (id) => {
    swal({
      title: "Are you sure you want to delete?",
      text: "Once deleted, you won't be able to revert this!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",

        confirm: {
          text: "Delete",
          value: true,
          className: "custom-ok-button",
        },
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteFromCart(id);
      }
    });
  };

  // Function to delete item from cart
  const deleteFromCart = async (id) => {
    try {
      const result = await deleteApiCall(
        `${deleteFromcartApi}/${user_id}/${id}`
      );
      if (result?.data?.status) {
        ToastMessage("success", result.data.message);
        const updatedData = data.filter((item) => item.productId !== id);
        setData(updatedData);
        refreshCart();
        setReload(!reload);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to navigate to checkout page
  const moveToCheckout = () => {
    const outOfStockProducts = data?.filter((item) => item.is_active === 0);
    if (outOfStockProducts.length) {
      ToastMessage(
        "error",
        "Please remove out of stock products from the cart to proceed."
      );
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      <div>
     
        {pending ? (
          <Loader />
        ) : (
          <div className="newcart_container"
          style={{
            marginTop:"20px"
          }}>
            {data.length ? (
              <div className="">
              
                <div className=""
                style={{
                    paddingTop:"1px"
                }}>
                  {data.map((product, index) => (
                    <div key={index}>
                      <div className="carttablecon d-flex">
                        <div className="cartimg_container">
                          <img
                            src={`${ImageUrl}${product.files}`}
                            alt="Product"
                            className="cartimgIntable"
                            onClick={() =>
                              goToDetails(
                                product.productId,
                                product.product_name
                              )
                            }
                          />
                        </div>

                        <div className="details">
                          <div>
                            <p
                              className="cart_productname"
                              onClick={() =>
                                goToDetails(
                                  product.productId,
                                  product.product_name
                                )
                              }
                            >
                              {product.product_name}
                            </p>
                            {product.product_size !== "FreeSize" && (
                              <p>Size: {product.product_size}</p>
                            )}
                            {product.color_code !== "FreeColor" && (
                              <p className="cart_productcolor">
                                Color:{" "}
                                <CircleIcon
                                  sx={{
                                    color: product.color_code,
                                    fontSize: "20px",
                                  }}
                                />
                              </p>
                            )}
                          </div>

                          <div className="cart_product_mrp header-cart-item-rupee">
                            <CurrencyRupeeIcon className="rsicon" />
                            {product.discount_percent === 0
                              ? product.mrp_amount
                              : product.discount_amount}
                          </div>

                          {/* ************ qunaitty btn ************* */}
                          <div>
                            {product.is_active === 0 ? (
                              <p className="oos">Out Of Stock</p>
                            ) : (
                              <div className="qunatitydivforMobile d-flex">
                                <RiSubtractLine
                                  disabled={loading}
                                  onClick={() =>
                                    handleMinus(
                                      product.id,
                                      product.quantity,
                                      index
                                    )
                                  }
                                />

                                <input
                                  type="number"
                                  name="num-product2"
                                  value={product.quantity}
                                  style={{ width: "20px" }}
                                />

                                <IoAddOutline
                                  type="button"
                                  disabled={loading}
                                  onClick={() => handlePlus(product.id, index)}
                                />
                              </div>
                            )}
                          </div>

                          <div className="cart_product_mrp header-cart-item-rupee ">
                              <span>Total : </span>
                            <CurrencyRupeeIcon className="rsicon" />
                            {product.discount_percent === 0
                              ? product.mrp_amount * product.quantity
                              : product.discount_amount * product.quantity}
                          </div>

                          <div className="remove_btn_container">
                            <button
                              className="icon-btn add-btn cart_delete_btn"
                              onClick={() => deleteFromCartAlert(product.id)}
                            >
                              <GrFormClose
                                className="crosicon"
                                style={{
                                  fontSize: "18px",
                                  color: "black",
                                  verticalAlign: "center",
                                }}
                                
                              />
                              <span>remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="total2">
                  <h2>Cart Totals</h2>
                  <div className="tablecart2">
                    <ul className="tableul">
                      <li className="totalList">
                        <span className="listText">Subtotal</span>
                        <span className="listValue">
                          <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />{" "}
                          {Number(totalPrice).toFixed(2)}
                        </span>
                      </li>
                      <li className="totalList">
                        <span className="listText">Discount</span>
                        <span className="listValue">10% off</span>
                      </li>
                      <li className="totalList">
                        <span className="listText">Total</span>
                        <span className="listValue">
                          <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />{" "}
                          {Number(totalPrice - totalPrice * 0.1).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <button
                    className="custom-checkout-button"
                    name="PROCEED To CEHCKOUT"
                    data-aos="fade-up"
                    type="submit"
                    onClick={moveToCheckout}
                    style={{ WidthFull }}
                  >
                    PROCEED To CEHCKOUT
                    <div className="innercontainer">PROCEED To CEHCKOUT</div>
                  </button>
                </div>
              </div>
            ) : (
              <Empty image={emptycartlist} btn="Shop Now" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartForMobile;
