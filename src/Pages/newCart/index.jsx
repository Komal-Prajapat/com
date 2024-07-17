import React, { useEffect } from "react";
import "./index.css";

import { RiSubtractLine } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import TopPageImage from "../../components/toppageimage";
import CartForMobile from "../CartForMobile";

import "./index.css";
import Empty from "../emptypage/emptyCart";
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

const Newcart = ({ reload, setReload }) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const [price, setprice] = React.useState("");
  const [deliverycharge, setDeliverycharge] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [deliverychargevalue, setDeliverychargevalue] = React.useState("");
  const [totalprice, setTotalprice] = React.useState("");

  const getCart = async () => {
    setPending(true);
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setprice(result?.data?.cartTotalPrice);
        setDeliverycharge(result?.data?.deliveryCharges);
        setDiscount(result?.data?.discount);
        setTotalprice(result?.data?.totalCartValue);
        setPending(false);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setPending(false);
    }
  };
  const refreshCart = async () => {
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setprice(result?.data?.cartTotalPrice);
        setDeliverycharge(result?.data?.deliveryCharges);
        setDiscount(result?.data?.discount);
        setTotalprice(result?.data?.totalCartValue);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleplus = async (id, index) => {
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
    } finally {
      setPending(false);
      setLoading(false);
    }
  };

  const handleminus = async (id, quantity, index) => {
    if (quantity === 1) {
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
      } finally {
        setLoading(false);
      }
    }
  };

  const moveToCheckout = () => {
    const checkdata = data?.filter((check) => check.is_active === 0);
    if (checkdata.length) {
      ToastMessage(
        "error",
        "please remove out of stoke product from cart to move forward"
      );
    } else {
      navigate("/checkout");
    }
  };

  const gotodetails = (id, name) => {
    navigate(`/productDetails/${id}/${name}`);
  };

  const deletefromCartAlert = (id) => {
    swal({
      title: "Are you sure you want to delete?",
      text: "Once deleted, You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletefromCart(id);
      }
    });
  };

  const deletefromCart = async (id) => {
    try {
      const result = await deleteApiCall(
        `${deleteFromcartApi}/${user_id}/${id}`
      );
      if (result?.data?.status) {
        ToastMessage("success", result.data.message);
        const maydata = data.filter((item) => item.productId !== id);
        setData(maydata);
        refreshCart();
        setReload(!reload);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {}
  };

  const handlegetdeliverycharge = async () => {
    try {
      const result = await getApiCall(getdeliverycharge);
      if (result.data.status) {
        setDeliverychargevalue(result.data.data.cart_value);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handlegetdeliverycharge();
  }, []);

  return (
    <>
      <div className="CartForLaptop">
        <TopPageImage pagename="Cart" />
        {pending ? (
          <Loader />
        ) : (
          <div className="newcart_container">
            {data.length ? (
              <div className="">
                <div className="TopPageForMobile"></div>
                <table className="table table-wrapper">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <div className="carttablecon">
                            <div className="cartimg_container">
                              <img
                                src={`${ImageUrl}${product.files}`}
                                alt="Product"
                                className="cartimgIntable"
                                onClick={() =>
                                  gotodetails(
                                    product.productId,
                                    product.product_name
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <p
                              className="cart_productname"
                              onClick={() =>
                                gotodetails(
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
                        </td>
                        <td>
                          <div className="cart_product_mrp header-cart-item-rupee">
                            <CurrencyRupeeIcon className="rsicon" />
                            {product.discount_percent === 0
                              ? product.mrp_amount
                              : product.discount_amount}
                          </div>
                        </td>
                        {/* ************ qunaitty btn ************* */}
                        <td>
                          {product.is_active === 0 ? (
                            <p className="oos">Out Of Stock</p>
                          ) : (
                            <div className="qunatitydiv d-flex">
                              <RiSubtractLine
                                disabled={loading}
                                onClick={() =>
                                  handleminus(
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
                                onClick={() => handleplus(product.id, index)}
                              />
                            </div>
                          )}
                        </td>

                        <td>
                          <div className="cart_product_mrp header-cart-item-rupee ">
                            <CurrencyRupeeIcon className="rsicon" />
                            {product.discount_percent === 0
                              ? product.mrp_amount * product.quantity
                              : product.discount_amount * product.quantity}
                          </div>
                        </td>
                        <td>
                          <div className="remove_btn_container">
                            <button
                              className="icon-btn add-btn cart_delete_btn"
                              onClick={() => deletefromCartAlert(product.id)}
                            >
                              <GrFormClose
                                className="crosicon"
                                style={{
                                  fontSize: "18px",
                                  color: "var(--black-color)",
                                  verticalAlign: "center",
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="total2">
                  <h2 className=" cl2 p-b-10 "
                  style={{
                    color: "var(--black-color)",
                  }}
                  >Cart totals</h2>
                  <div className="tablecart2">
                    <ul className="tableul">
                      <li className="totalList">
                        <span className="listText">
                          {" "}
                          Price ({data.length} item) :
                        </span>

                        <span className="listvalue">
                          <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                          {Number(price).toFixed(2)}
                        </span>
                      </li>

                      <li className="totalList">
                        <span className="listText">Discount :</span>
                        <span className="listvalue">
                          <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                          {discount ? Number(discount).toFixed(2) : "0.00"}
                        </span>
                      </li>

                      <li className="totalList">
                        <span className="listText">Delivery Charges :</span>
                        {deliverycharge === "Free" ? (
                          <p className="valuesize">{deliverycharge} </p>
                        ) : (
                          <span className="listvalue">
                            <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                            {deliverycharge}
                          </span>
                        )}
                      </li>

                      <li className="totalList">
                        <span className="listText"
                        style={{

                        }}
                        >Total :</span>

                        <span className="listvalue">
                          <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />{" "}
                          {Number(totalprice).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                  </div>{" "}
                  <ButtonComponent
                    type="submit"
                    onClick={moveToCheckout}
                    btn_name="Proceed to Checkout"
                  />
                  {deliverychargevalue === price ||
                  deliverychargevalue > price ? (
                    <p className="addmore_text justify-center d-flex my-4">
                      <span className="addmore_text">* Add more products worth</span>
                      <span className="addmore_rs d-flex">
                        {" "}
                        <CurrencyRupeeIcon
                          sx={{ fontSize: "18px", display: "flex" }}
                        />{" "}
                        {Number(deliverychargevalue - price).toFixed(2)}
                      </span>{" "}
                       <span> to avail Free Delivery</span>
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <Empty image={emptycartlist} btn="Shop Now" />
            )}
          </div>
        )}
      </div>

      <div className="cartForMovbile">
        <CartForMobile></CartForMobile>
      </div>
    </>
  );
};

export default Newcart;
