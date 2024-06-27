/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect } from "react";
import "./index.css";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FaFolder } from "react-icons/fa";

import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  ImageUrl,
  getApiCall,
  getcartApi,
  getlastaddress,
  paymentApi,
  placeorderApi,
  postApiCall,
  quantitydecApi,
  quantityincApi,
} from "../../API/baseUrl";
import ToastMessage from "../../utils/ToastMessage";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useFormik } from "formik";
import SuccessDialog from "../placeorder/ordersuccess";
import { addressformschema } from "../../utils/validation";
import ButtonComponent from "../../components/button";
import CircleIcon from "@mui/icons-material/Circle";
import Loader from "../../components/loader";
import TopPageImage from "../../components/toppageimage";
import ButtonForAll from "../../components/ButtonForALL";
import { Link } from "react-router-dom";
const mobilenumber = localStorage.getItem("mobile");

const initialValues = {
  mobile: mobilenumber?.replace("-", ""),
  firstname: "",
  lastname: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  email: "",
};

const OrderCheckout = ({ reload, setReload }) => {
  const user_id = localStorage.getItem("user_id");
  const [value, setValue] = React.useState("1");
  const [data, setData] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const [price, setprice] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showsuccessPopup, setShowsuccessPopup] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [deliverycharge, setDeliverycharge] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [totalprice, setTotalprice] = React.useState("");
  const [paymentdata, setpaymentData] = React.useState({});
  const [key, setKey] = React.useState("");
  const [paynow, setPaynow] = React.useState(true);
  const [prifilluserdata, setPrifilluserdata] = React.useState();
  const [loader, setLoader] = React.useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: addressformschema,
    onSubmit: () => (paynow ? displayRazorpay() : submitForm()),
  });

  const handleradioChange = (event) => {
    setValue(event.target.value);
  };

  const handlepaymentChange = (event) => {
    if (event.target.value == 0) {
      setPaynow(true);
    } else {
      setPaynow(false);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    handleSubmit();
    console.log("error", errors);
    console.log("values", values);
  };

  const submitForm = async (type, paymentid) => {
    const apivalue = {
      userId: user_id,
      mobile: values.mobile,
      first_name: values.firstname,
      last_name: values.lastname,
      address: values.address,
      city: values.city,
      state: values.state,
      pinCode: values.pincode,
      email: values.email,
      addressType: value,
      payment_mode: type ? "Net Banking" : "Cash on Delivery (COD)",
      productDetail: data,
      total_order_amount: totalprice,
      delivery_charge: deliverycharge,
      order_discount: discount,
      payment_id: paymentid ? paymentid : "",
    };
    try {
      setLoading(true);
      setLoader(true);
      const result = await postApiCall(placeorderApi, apivalue);
      if (result.data.status) {
        setShowsuccessPopup(true);
        setReload(!reload);
        setOrderId(result.data?.product_order_id);
        ToastMessage("success", result.data.message);
        setLoading(false);
        setLoader(false);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      ToastMessage("error", error.message);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  const getorderid = async (amount) => {
    try {
      const result = await postApiCall(paymentApi, {
        total_amount: amount,
      });

      if (result.data.status) {
        setpaymentData(result.data.data);
        setKey(result.data.key_id);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  const getCart = async () => {
    setPending(true);
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        getorderid(result?.data?.totalCartValue);
        setPending(false);
        setData(result?.data?.productDetails);
        setprice(result?.data?.cartTotalPrice);
        setDeliverycharge(result?.data?.deliveryCharges);
        setTotalprice(result?.data?.totalCartValue);
        setDiscount(result?.data?.discount);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setPending(false);
    }
  };

  const getLastAddress = async () => {
    try {
      const result = await getApiCall(`${getlastaddress}/${user_id}`);
      if (result?.data?.status) {
        const {
          mobile,
          first_name,
          last_name,
          email,
          address,
          city,
          state,
          pinCode,
          addressType,
        } = result?.data?.userAddress || {};
        setPrifilluserdata(result?.data?.userAddress);
        setFieldValue("mobile", mobile);
        setFieldValue("firstname", first_name);
        setFieldValue("lastname", last_name);
        setFieldValue("email", email);
        setFieldValue("address", address);
        setFieldValue("city", city);
        setFieldValue("state", state);
        setFieldValue("pincode", pinCode);
        setValue(addressType ? addressType : "1");
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getCart();
    getLastAddress();
  }, []);

  const refreshCart = async () => {
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setprice(result?.data?.cartTotalPrice);
        setDeliverycharge(result?.data?.deliveryCharges);
        setTotalprice(result?.data?.totalCartValue);
        setDiscount(result?.data?.discount);
      } else {
      }
    } catch (error) {}
  };

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: key,
      amount: Number(totalprice).toFixed(2) * 100,
      currency: "INR",
      name: "Treasure box",
      description: "Explore the world of treasure",
      image: "https://example.com/your_logo",
      order_id: paymentdata.id,
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        setLoader(true);
        submitForm("type", response.razorpay_payment_id);
      },
      prefill: {
        name: values.firstname + values.lastname,
        email: values.email,
        contact: values.mobile,
      },
      notes: {
        address: values.address + values.city + values.state + values.pincode,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);

    rzp.open();
  };
  const [openDirectPayment, setOpenDirectPayment] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(false);
  return (
    <>
      <TopPageImage pagename="Checkout" />

      <div className="checkoutpagecon">
        {/* <div className="toplogincon d-flex" >
        <div className="login"><FaFolder className="folder"/>
        Returning customer? <Link to={"/login"}> <span>Click here to login</span></Link></div>

        <div className="coupa">
        <FaFolder className="folder"/>
Have a coupon? Click here to enter your code
        </div>
      </div> */}

        <div
          className="ordercheckout_container"
          style={{
            marginTop: "100px",
          }}
        >
          {showsuccessPopup ? (
            <SuccessDialog
              successDialog={showsuccessPopup}
              orderId={orderId}
              setSuccessDialog={setShowsuccessPopup}
            />
          ) : (
            ""
          )}

          {loader ? (
            <Loader />
          ) : (
            <div className="ordercheckout_container_inside">
              <div className="topbar d-flex"></div>

              <form
                className="ordercheckout_customer_information_container"
                onSubmit={handleSubmit2}
              >
                <h3>Billing Details</h3>
                <div className="ordercheckout_customer_contact_container">
                  <h3 className="checkout_heading_text fs-26">Contact</h3>
                </div>
                <div className="ordercheckout_customer_contact_field">
                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield"
                      value={values.mobile}
                      fullWidth
                      name="mobile"
                      focused
                      id="mobile"
                      label="Mobile Number"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobile && touched.mobile ? (
                      <p className="address-form-error">{errors.mobile}</p>
                    ) : null}
                  </div>
                </div>

                <div className="ordercheckout_customer_contact_container">
                  <h3 className="checkout_heading_text margin-top ">
                    Delivery
                  </h3>
                </div>
                <div className="ordercheckout_customer_contact_field">
                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield "
                      value={values.firstname}
                      fullWidth
                      name="firstname"
                      id="firstname"
                      label="First Name"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstname && touched.firstname ? (
                      <p className="address-form-error">{errors.firstname}</p>
                    ) : null}
                  </div>

                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield "
                      value={values.lastname}
                      fullWidth
                      name="lastname"
                      id="lastname"
                      label="Last Name"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastname && touched.lastname ? (
                      <p className="address-form-error">{errors.lastname}</p>
                    ) : null}
                  </div>
                </div>
                <div className="ordercheckout_customer_contact_field">
                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield"
                      value={values.address}
                      fullWidth
                      name="address"
                      id="address"
                      label="Address"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address ? (
                      <p className="address-form-error">{errors.address}</p>
                    ) : null}
                  </div>
                </div>
                <div className="ordercheckout_customer_contact_field">
                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield"
                      value={values.city}
                      fullWidth
                      name="city"
                      id="city"
                      label="City"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.city && touched.city ? (
                      <p className="address-form-error">{errors.city}</p>
                    ) : null}
                  </div>

                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield"
                      value={values.state}
                      fullWidth
                      name="state"
                      id="state"
                      label="State"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.state && touched.state ? (
                      <p className="address-form-error">{errors.state}</p>
                    ) : null}
                  </div>
                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield"
                      value={values.pincode}
                      fullWidth
                      name="pincode"
                      id="pincode"
                      label="Pincode"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.pincode && touched.pincode ? (
                      <p className="address-form-error">{errors.pincode}</p>
                    ) : null}
                  </div>
                </div>
                <div className="ordercheckout_customer_contact_field">
                  <div className="fullwidth">
                    <TextField
                      className="profile-textfield"
                      value={values.email}
                      fullWidth
                      name="email"
                      id="email"
                      label="Email"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="address-form-error">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
                  <FormLabel id="demo-radio-buttons-group-label checkout_heading_text">
                    Address Type
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="1"
                    name="addressType"
                    className="addresstype_radio"
                    value={value}
                    onChange={handleradioChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={<p>Home (All day delivery)</p>}
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label={
                        <p className="adress_text">
                          Work (Delivery between 10AM to 5PM)
                        </p>
                      }
                    />
                  </RadioGroup>
                </Grid>
                <div className="ordercheckout_customer_contact_container">
                  <h2 className="checkout_heading_text margin-top fs-26">
                    Payment
                  </h2>
                </div>
                <div className="ordercheckout_customer_contact_field">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="0"
                    name="radio-buttons-group"
                    onChange={handlepaymentChange}
                  >
                    <FormControlLabel
                      className="formcontrol"
                      value="0"
                      control={<Radio sx={{ color: "blue" }} />}
                      label={<p>Net Banking</p>}
                    />

                    <FormControlLabel
                      className="formcontrol"
                      value="1"
                      control={<Radio sx={{ color: "blue" }} />}
                      label={<p>Cash on Delivery (COD)</p>}
                    />
                  </RadioGroup>
                </div>

                <ButtonForAll
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  name="Place Order"
                ></ButtonForAll>
              </form>

              <div className="ordercheckout_summarycontainer">
                <div className="ordercheckout_summarycontainer_inside">
                  {/* {data.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="ordercheckout_summary_product_container"
                    >
                      <div className="order_summary_img_container">
                        <img src={`${ImageUrl}${product.files}`} alt="IMG" />

                        <div className="cart_quantity_container">
                          <button
                            className="cart_quantitywrap"
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              handleminus(product.id, product.quantity, index)
                            }
                          >
                            <i className="fs-16 zmdi zmdi-minus"></i>
                          </button>

                          <input
                            className="cart_quantitywrap"
                            type="number"
                            name="num-product2"
                            value={product.quantity}
                          />

                          <button
                            className="cart_quantitywrap"
                            type="button"
                            disabled={loading}
                            onClick={() => handleplus(product.id, index)}
                          >
                            <i className="fs-16 zmdi zmdi-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="order_summary_namequantity_container">
                        <h2 className="text-overflow fs-18">
                          {product.product_name}
                        </h2>
                        {product.product_size === "FreeSize" ? (
                          ""
                        ) : (
                          <p className="align-justify">
                            Size : {product.product_size}
                          </p>
                        )}

                        {product.color_code === "FreeColor" ? (
                          ""
                        ) : (
                          <p className="cart_productcolor">
                            {" "}
                            Color :{" "}
                            <CircleIcon
                              sx={{
                                color: product.color_code,
                                fontSize: "20px",
                              }}
                            />
                          </p>
                        )}

                        <p className="header-cart-item-rupee">
                          <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                          {product.discount_percent === 0
                            ? product.mrp_amount
                            : product.discount_amount}
                        </p>
                      </div>
                    </div>
                  );
                })} */}

                  {/* <div className='order_summary_discount_container' >
                            <input type='text' className='coupon_code_field' placeholder='Promo Code' value="" />
                            <button className='discount_button' type='button' >Apply</button>
                        </div> */}

                  <div className="order_total_container">
                    <h3>Your order</h3>
                    <table className="order_total_container_inside">
                      <th className="valuesize">
                        Price ({data.length} item) :
                      </th>
                      <th className="valuesize header-cart-item-rupee">
                        <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />{" "}
                        {Number(price).toFixed(2)}
                      </th>
                    </table>
                    <table className="order_total_container_inside">
                      <th className="valuesize">Discount :</th>
                      <th className="valuesize header-cart-item-rupee">
                        <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                        {discount ? Number(discount).toFixed(2) : "0.00"}
                      </th>
                    </table>
                    <table className="order_total_container_inside">
                      <th className="valuesize">Delivery Charges :</th>
                      {deliverycharge === "Free" ? (
                        <th className="valuesize header-cart-item-rupee">
                          {deliverycharge}
                        </th>
                      ) : (
                        <p className="valuesize header-cart-item-rupee">
                          <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />{" "}
                          {deliverycharge}
                        </p>
                      )}
                    </table>
                    <table className="order_total_container_inside">
                      <th className="valuesize">Total Price :</th>
                      <th className="valuesize  header-cart-item-rupee totalpricenewcart">
                        <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />
                        {Number(totalprice).toFixed(2)}
                      </th>
                    </table>

                    <p>
                      <a
                        class="DirectBank togglebtnFirst"
                        data-bs-toggle="collapse"
                        href="#multiCollapseExample1"
                        role="button"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1"
                      >
                        DIRECT BANK TRANSFER
                      </a>
                    </p>
                    <div class="row">
                      <div class="col">
                        <div
                          class="collapse multi-collapse"
                          id="multiCollapseExample1"
                        >
                          <div class="card card-body">
                            Make your payment directly into our bank account.
                            Please use your Order ID as the payment reference.
                            Your order won’t be shipped until the funds have
                            cleared in our account.
                          </div>
                        </div>
                      </div>
                    </div>

                    <ButtonForAll name=" Place order "></ButtonForAll>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderCheckout;
