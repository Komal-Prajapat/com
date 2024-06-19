import React, { useEffect } from 'react'
import "./index.css"
import { ImageUrl,getApiCall, getcartApi, getuseraddressApi, getuserloginApi, getuserprofile, logoutApi, placeorderApi, postApiCall, quantitydecApi, quantityincApi } from '../../API/baseUrl';
import ToastMessage from '../../utils/ToastMessage';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Card, FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveTag from '../../components/removetag';
import Loader from '../../components/loader';
import AddIcon from '@mui/icons-material/Add';
import AddressDialog from './addressModal';
import GotocartDialog from './orderemptymodal';
import EditAddressDialog from './editaddressmodal';
import swal from 'sweetalert';
import SuccessDialog from './ordersuccess';
import { ThreeDots } from 'react-loader-spinner';
import CircleIcon from '@mui/icons-material/Circle';


const loader = <>
  Loading
  <ThreeDots
    height="20"
    width="20"
    radius="9"
    color="var(--white)"
    wrapperStyle={{}}
    ariaLabel="three-dots-loading"
    wrapperClassName=""
    visible={true}
  />
</>

const Placeorder = ({ refresh, setRefresh }) => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id")
  const [data, setData] = React.useState([])
  const [userlogin, setUserlogin] = React.useState({})
  const [useraddress, setUseraddress] = React.useState([])
  const [changelogin, setChangelogin] = React.useState(false)
  const [showmodal, setShowmodal] = React.useState(false)
  const [showeditmodal, setShoweditmodal] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [box, setBox] = React.useState(true)
  const [deliverybox, setDeliverybox] = React.useState(false)
  const [paymentoption, setpaymentoption] = React.useState(false)
  const [changedileveryaddress, setChangedileveryaddress] = React.useState(true)
  const [address, setaddress] = React.useState("")
  const [value, setValue] = React.useState('');
  const [showaddress, setShowaddress] = React.useState([]);
  const [gotocartDialog, setGotocartDialog] = React.useState(false);
  const [successDialog, setSuccessDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");
  const [userid, setUserid] = React.useState("");
  const [showcontinuebtn, setShowcontinuebtn] = React.useState(false);
  const [email, setEmail] = React.useState("");


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getProfile = async () => {
    try {
        const result = await getApiCall(`${getuserprofile}/${user_id}`)
        if (result?.data?.status) {
            const { userId, dial_code, mobile, first_name, last_name, email, gender } = result?.data?.data || {}
            setEmail(email)
        } else {
        }
    } catch (error) {
    }
}

useEffect(() => {
    getProfile()
}, [])

  const getCart = async () => {
    setPending(true)
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`)
      if (result?.data?.status) {
        setPending(false)
        setData(result?.data?.productDetails)
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setPending(false)
    }
  }
  const getCartList = async () => {
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`)
      if (result?.data?.status) {
        setData(result?.data?.productDetails)
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
    }
  }

  const getuserlogin = async () => {

    try {
      const result = await getApiCall(`${getuserloginApi}/${user_id}`)
      if (result?.data?.status) {
        setUserlogin(result?.data?.data)
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
    }
  }

  const getuseraddress = async () => {
    try {
      const result = await postApiCall(`${getuseraddressApi}/${user_id}`)
      if (result?.data?.status) {
        setUseraddress(result?.data?.data)
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    getCart()
    getuserlogin()
    getuseraddress()
  }, [])

  const deletefromCart = async (array, id, index) => {
    if (array.length === 1) {
      const mydata = array?.filter(item => item.productId !== id)
      setData(mydata)
      setGotocartDialog(true)
    }
    else {
      const mydata = array?.filter(item => item.productId !== id)
      setData(mydata)
    }

  }

  const changeLogin = () => {
    setChangelogin(!changelogin);
    setBox(!box)
    setDeliverybox(!deliverybox)
    setChangedileveryaddress(!changedileveryaddress)
    setpaymentoption(false)
  }
  const gotoprofile = () => {
      navigate("/profile")
  }
  const changeaddress = () => {
    setChangedileveryaddress(!changedileveryaddress);
    setBox(!box)
    setpaymentoption(false)
  }
  const handleaddress = (id) => {
    const myaddress = useraddress.filter(item => item.id === id)
    setShowaddress(myaddress)
    const addressstring = JSON.stringify(myaddress);
    const addressvalue = addressstring.slice(1, -1);
    setaddress(addressvalue)
    setChangedileveryaddress(!changedileveryaddress);
    setBox(!box)
    setShowcontinuebtn(true)
    setpaymentoption(false)
  }

  const handlenewaddress = () => {
    setShowmodal(!showmodal);
  }
  const handleeditaddress = (id) => {
    setShoweditmodal(!showeditmodal);
    setUserid(id)
  }

  const handlePayment = () => {
    setpaymentoption(!paymentoption);
  }

  const handleplus = async (arr, id) => {
    try {
      const result = await postApiCall(quantityincApi, {
        id: id,
        userId: user_id,
      })
      if (result?.data?.status) {
        getCartList()
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
    }
  }


  const handleminus = async (arr, id, quantity) => {
    if (quantity === 1) {
      setChangelogin(changelogin)
    } else {
      try {
        const result = await postApiCall(quantitydecApi, {
          id: id,
          userId: user_id,
        })
        if (result?.data?.status) {
          getCartList()
        } else {
          ToastMessage("error", result.data.message);
        }
      } catch (error) {
      } finally {
      }
    }
  }
  const logoutfromapp = async () => {
    try {
      const result = await postApiCall(`${logoutApi}/${user_id}`)
      if (result?.data?.status) {
        ToastMessage("success", result.data.message);
        localStorage.removeItem("user_id");
        navigate("/")
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const totalPrice = data?.reduce((sum, product) => sum + Number(product.total_price), 0);

  const PlaceOrder = async () => {
    if (email){
      setLoading(true)
      try {
        const result = await postApiCall(placeorderApi, {
          userId: user_id,
          full_address: address,
          payment_mode: "cash on delivery",
          productDetail: data,
          total_order_amount: totalPrice,
        })
        if (result?.data?.status) {
          setLoading(false)
          setRefresh(!refresh)
          setSuccessDialog(true)
          ToastMessage("success", result.data.message);
          setOrderId("success", result.data?.product_order_id);
        } else {
          ToastMessage("error", result.data.message);
        }
      } catch (error) {
        console.log("error", error)
      }
      finally {
        setLoading(false)
      }
    }else{
      ToastMessage("error", "Please complete your profile first");
    }
   
  }

  return (
    <>
      {pending ? <Loader /> :
        <>
          {successDialog ? <SuccessDialog successDialog={successDialog} orderId={orderId} setSuccessDialog={setSuccessDialog} /> : ""}
          {
            gotocartDialog ?
              <GotocartDialog gotocartDialog={gotocartDialog} setGotocartDialog={setGotocartDialog} /> :
              <div>
                <Grid container spacing={2} className='placeorder_container'>

                  <Grid item xs={12} sm={12} md={12} lg={7} className='order_container_one'>

                    {changelogin ? <Card className='card_order_changelogin'>
                      <div className='order_changelogin_contain'>
                        <h4><p>1</p>LOGIN</h4>
                      </div>
                      <div className='order_changelogin_inside'>
                        <div>
                          <p> <span>Phone</span> +{userlogin?.dial_code}{userlogin?.mobile}</p>
                          <p className='order_logout_text' onClick={logoutfromapp}>Logout & sign in to another account</p>
                        </div>
                        <div>
                          <button type='button' className='login_continue_btn' onClick={changeLogin}>Continue Checkout</button>
                        </div>
                      </div>
                      <div><span>Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to home page.</span></div>
                    </Card> :
                      <Card className='card_order_login'>
                        <div className='order_login_contain'>
                          <div className='login_number_container'>
                            <h4><p>1</p><h3>LOGIN<CheckIcon sx={{ color: "#1c13e7" }} /></h3></h4>
                            <p>+{userlogin?.dial_code} {userlogin?.mobile}</p>
                          </div>
                        </div>
                        <div>
                          <button className='login_change_btn' type='button' onClick={changeLogin}>Change</button>
                        </div>
                      </Card>
                    }

                    {email? "" : <Card className='card_order_login'>
                      <div className='order_login_contain'>
                        <div className='login_number_container'>
                          <h4><h3>Complete your profile</h3></h4>
                        </div>
                      </div>
                      <div>
                        <button className='login_change_btn' type='button' onClick={gotoprofile}>Complete</button>
                      </div>
                    </Card>
                    }

                    

                    {useraddress.length ?
                      <div>
                        {changedileveryaddress ?
                          <>
                            <Card className='card_order_changelogin'>
                              <div className='order_login_contain'>
                                <div className='login_number_container'>
                                  <h4><p>2</p>DELIVERY ADDRESS</h4>
                                  <FormControl>
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      defaultValue={useraddress[0]}
                                      name="radio-buttons-group"
                                      value={value}
                                      onChange={handleChange}
                                    >


                                      {useraddress.map((user, index) => {
                                        return (
                                          <>
                                            <FormControlLabel className='formcontrol'
                                              value={index + 1}
                                              control={
                                                <Radio sx={{ color: "blue" }} />}
                                              label={<p>{user?.name} {user?.addressType} {user?.mobile}</p>}
                                            />
                                            <p>{user?.name} {user?.locality}, {user?.landmark}, {user?.city},
                                              {user?.state} - {user?.pinCode}</p>
                                            {
                                              value - 1 === index ? <div className='edit_button_container'>
                                                <button type='button' style={{ margin: 15 }} className='login_continue_btn' onClick={() => handleaddress(user?.id)}>Deliver Here</button>
                                                <button type='button' style={{ margin: 15 }} className='login_continue_btn' onClick={() => handleeditaddress(user?.id)}>Edit</button>
                                              </div> : ""
                                            }
                                          </>)
                                      })}
                                      <br></br>{showeditmodal ? <EditAddressDialog getuseraddress={getuseraddress} onClick={handleeditaddress} showeditmodal={showeditmodal} setShoweditmodal={setShoweditmodal} userid={userid} /> : ""}
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                              </div>

                            </Card>
                            <Card className='card_order_login'>
                              <div className='order_login_contain'>
                                <div className='login_number_container'>
                                  <h4 style={{ cursor: "pointer" }} onClick={handlenewaddress} ><AddIcon sx={{ fontSize: "18px", cursor: "pointer" }} />Add new address</h4>
                                </div>
                              </div>
                              {showmodal ? <AddressDialog getuseraddress={getuseraddress} onClick={handlenewaddress} setShowmodal={setShowmodal} showmodal={showmodal} /> : ""}
                            </Card>
                          </>
                          :


                          <Card className='card_order_login'>
                            <div className='order_login_contain'>
                              <div className='login_number_container'>
                                <h4><p>2</p><h3>DELIVERY ADDRESS{deliverybox ? "" : <CheckIcon sx={{ color: "#1c13e7" }} />}</h3></h4>
                                {deliverybox ? "" :
                                  <p> {showaddress[0]?.name} {showaddress[0]?.locality} {showaddress[0]?.landmark} {showaddress[0]?.city} {showaddress[0]?.state} - {showaddress[0]?.pinCode}</p>

                                }</div>
                            </div>
                            {deliverybox ? "" :
                              <div>
                                <button className='login_change_btn' type='button' onClick={changeaddress}>Change</button>
                              </div>
                            }
                          </Card>

                        }

                      </div>
                      :
                      <Card className='card_order_login'>
                        <div className='order_login_contain'>
                          <div className='login_number_container'>
                            <h4 style={{ cursor: "pointer" }} onClick={handlenewaddress} ><AddIcon sx={{ fontSize: "18px", cursor: "pointer" }} />Add address</h4>
                          </div>
                        </div>
                        {showmodal ? <AddressDialog getuseraddress={getuseraddress} onClick={handlenewaddress} setShowmodal={setShowmodal} showmodal={showmodal} /> : ""}
                      </Card>
                    }

                    <Card className='card_order_login'>
                      <div className='order_login_contain'>
                        <div className='login_number_container'>
                          <h4><p>3</p><h3>ORDER SUMMARY {box ? "" : <CheckIcon sx={{ color: "#1c13e7" }} />}</h3></h4>
                          {box ? "" :
                            <div className="wrap-table-shopping-cart">
                              {data.map((product, index) => {
                                return (
                                  <div className='order_cart_containe'>
                                    <div className='order_description_quantity'>
                                      <div className="cart_img_container">
                                        <img src={`${ImageUrl}${product.files}`} alt="IMG" />
                                        <div className="cart_wrap-num-product flex-w m-l-auto m-r-0">
                                          <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m cart_qantity_btn" onClick={() => handleminus(data, product.id, product.quantity)}>
                                            <i className="fs-16 zmdi zmdi-minus"></i>
                                          </div>

                                          <input className="mtext-104 cl3 txt-center num-product cart_qantity_btn" type="number" name="num-product2" value={product.quantity} />

                                          <div className="btn-num-product-up cart_qantity_btn cl8 hov-btn3 trans-04 flex-c-m" onClick={() => handleplus(data, product.id)}>
                                            <i className="fs-16 zmdi zmdi-plus"></i>
                                          </div>
                                        </div>
                                        {/* ----------------------- */}
                                        <div className="remove_btn_container">
                                          <button className="icon-btn add-btn cart_delete_btn" onClick={() => deletefromCart(data, product.productId, index)}>
                                            <DeleteIcon sx={{ color: "red", fontSize: "24px" }} /> REMOVE
                                          </button>
                                        </div>

                                        {/* ----------------------- */}
                                      </div>
                                    </div>
                                    <div className='order_remove_contain'>
                                      <div className='pro_description'>
                                        <h3 className='product_name_cart'>{product.product_name}</h3>
                                        <p className='header-cart-item-rupee'><CurrencyRupeeIcon sx={{ fontSize: "18px" }} />{product.mrp_amount}/-</p>
                                        <p className='product_description_cart'><RemoveTag ParserText={product.description} /></p>
                                        <p className='product_description_cart'>Size : {product.product_size}</p>
                                        <p className='product_description_cart'> Color : <CircleIcon sx={{ color: product.color_code }} /></p>
                                      </div>


                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          }
                        </div>
                      </div>
                    </Card>

                    {paymentoption ?

                      <Card className='card_order_login'>
                        <div className='order_login_contain'>
                          <div className='login_number_container'>
                            <h4><p>4</p><h3> PAYMENT OPTION<CheckIcon sx={{ color: "#1c13e7" }} /></h3></h4>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="1"
                              name="radio-buttons-group"
                            >
                              <FormControlLabel className='formcontrol' value="1" control={<Radio sx={{ color: "blue" }} />} label={<p>Cash on Delivery (COD)</p>} />
                            </RadioGroup>
                          </div>
                        </div>
                        <div>
                          <button className='login_continue_btn' disabled={loading} loading={loading} type='button' onClick={PlaceOrder}>{loading ? loader : "Place Order"}</button>
                        </div>
                      </Card>
                      :

                      <Card className='card_order_login'>
                        <div className='order_login_contain'>
                          <div className='login_number_container'>
                            <h4><p>4</p><h3>PAYMENT OPTION</h3></h4>
                          </div>
                        </div>
                        {showcontinuebtn ? <div>
                          <button className='login_continue_btn' type='button' onClick={handlePayment}>Continue</button>
                        </div> :
                          ""
                        }
                      </Card>

                    }
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} className='order_container_two'>
                    <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                      <h4 className="mtext-109 cl2 p-b-10 bor12">
                        Price Details
                      </h4>

                      <div className="bor12">
                        <div className="displayprice">
                          <div className="valuesize">
                            Price ({data.length} item) :
                          </div>
                          <div className="keysize align-center">
                            <CurrencyRupeeIcon sx={{ fontSize: "18px" }} /> {totalPrice}/-
                          </div>
                        </div>

                        <div>
                          <div className="displayprice">
                            <div className="valuesize">
                              Discount :
                            </div>
                            <div className="size-209 align-center">
                              -<CurrencyRupeeIcon sx={{ fontSize: "18px" }} />0/-
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="displayprice  p-b-13">
                            <div className="size-208 white-space">
                              Delivery Charges :
                            </div>
                            <div className="size-209 align-center">
                              Free
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="flex-w flex-t p-t-5 p-b-33">
                        <div className="size-208">
                          <span className="mtext-101 cl2">
                            Total :
                          </span>
                        </div>

                        <div className="size-209 p-t-1">
                          <span className="mtext-110 cl2 header-cart-item-rupee end">
                            <CurrencyRupeeIcon sx={{ fontSize: "18px" }} /> {totalPrice}/-
                          </span>
                        </div>
                      </div>
                    </div>
                  </Grid>



                </Grid>
              </div>

          }



        </>
      }
    </>
  )
}

export default Placeorder;