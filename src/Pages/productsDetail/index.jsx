import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./productdetail.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import ToastMessage from "../../utils/ToastMessage";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  addtocartApi,
  addtowishlist,
  categoryList,
  getApiCall,
  getProductApi,
  postApiCall,
} from "../../API/baseUrl";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Login from "../login/login";
import RemoveTag from "../../components/removetag";
import CircleIcon from "@mui/icons-material/Circle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Skeleton } from "@mui/material";
// import instock from '../../Assect/ready-to-ship-icon.jpg';
import instock from "../../Assect/return-box.png";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Slider2 from "../../slider/productDetailSlider";
import "./index.css";
import TopPageImage from "../../components/toppageimage";

const ProductDetail = ({ reload, setReload, setCatval }) => {
  const user_id = localStorage.getItem("user_id");
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = React.useState(1);
  const [showmodal, setShowmodal] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [details, setDetails] = useState({});
  const [images, setImages] = useState([]);
  const [showloginpopup, setShowloginpopup] = useState(false);
  const [general, setGeneral] = useState([]);
  const [cartbtnloading, setCartbtnloading] = useState(false);
  const [paramId, setParamId] = useState(id);
  const [info, setInfo] = useState([]);
  const [categoryname, setCategoryName] = useState([]);
  const [breadcumbcategory, setBreadcumbcategory] = useState([]);
  const [size, setSize] = useState([]);
  const [colorcode, setColorcode] = useState("");
  const [colorname, setColorname] = useState("");
  const [sizevalue, setSizevalue] = useState("");
  const [imageidvalue, setImageidvalue] = useState("");
  const [match, setMatch] = useState([]);
  const [toggle, setToggle] = useState([]);
  const [activeColorData, setActievColorData] = useState({});
  const [renderimage, setRenderimage] = useState("");

  const handleprofilePage = () => {
    setShowloginpopup(!showloginpopup);
  };
  useEffect(() => {
    setCatval("");
    setParamId(id);
  }, [id]);

  const handleplus = () => {
    if (counter === details.orderlimit) {
      ToastMessage("error", "Your order limit has been reached!");
    } else {
      setCounter(counter + 1);
    }
  };

  const handleminus = () => {
    if (counter === 1) {
      setCounter(counter);
    } else {
      setCounter(counter - 1);
    }
  };

  const getDetails = async () => {
    setPending(true);
    try {
      const result = await postApiCall(getProductApi, {
        userId: user_id ? user_id : 0,
        id: paramId,
      });
      if (result?.data?.status) {
        setPending(false);
        setDetails(result?.data?.data);
        setGeneral(result?.data?.Detail);
        setImages(result?.data?.images);
        setRenderimage(result?.data?.images[0].original);
        setSizevalue(result.data.Info[0]?.product_size?.split(",")[0]);

        const sizeArray = result.data.Info[0]?.product_size
          ?.split(",")
          .map((item, index) => {
            if (index === 0) {
              return {
                selected: true,
                name: item,
              };
            } else {
              return {
                selected: false,
                name: item,
              };
            }
          });
        setSize([...sizeArray]);

        const infoData = result.data.Info?.map((item, index) => {
          if (index === 0) {
            item.selected = true;
            setColorcode(item.color_code);
            setColorname(item.color_name);
          } else {
            item.selected = false;
          }
          return item;
        });
        setInfo(infoData);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false);
    }
  };
  const getDetailsafterclick = async () => {
    try {
      const result = await postApiCall(getProductApi, {
        userId: user_id ? user_id : 0,
        id: id,
      });
      if (result?.data?.status) {
        setDetails(result?.data?.data);
        setGeneral(result?.data?.Detail);
        setImages(result?.data?.images);
        setRenderimage(result?.data?.images[0].original);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [paramId]);

  const handlecart = async () => {
    setCartbtnloading(true);
    try {
      const result = await postApiCall(addtocartApi, {
        quantity: counter,
        productId: id,
        userId: user_id,
        color_code: colorcode ? colorcode : "FreeColor",
        color_name: colorname ? colorname : "FreeColor",
        product_size: sizevalue ? sizevalue : "FreeSize",
        imageId: imageidvalue,
      });
      if (result?.data?.status) {
        const newObj = {};
        newObj.color_name = colorname;
        newObj.product_size = sizevalue;
        setMatch([...match, newObj]);
        ToastMessage("success", result.data.message);
        getDetailsafterclick();
        setCartbtnloading(false);
        setReload(!reload);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setCartbtnloading(false);
    }
  };

  const handleafterloginaddtocart = async (userid) => {
    setCartbtnloading(true);
    try {
      const result = await postApiCall(addtocartApi, {
        quantity: counter,
        productId: id,
        userId: userid,
        color_code: colorcode ? colorcode : "FreeColor",
        color_name: colorname ? colorname : "FreeColor",
        product_size: sizevalue ? sizevalue : "FreeSize",
        imageId: imageidvalue,
      });
      if (result?.data?.status) {
        const newObj = {};
        newObj.color_name = colorname;
        newObj.product_size = sizevalue;
        setMatch([...match, newObj]);
        ToastMessage("success", result.data.message);
        getDetailsafterclick();
        setCartbtnloading(false);
        setReload(!reload);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setCartbtnloading(false);
    }
  };

  const handlelike = async () => {
    try {
      const result = await postApiCall(addtowishlist, {
        productId: id,
        userId: user_id,
      });
      if (result?.data?.status) {
        getDetailsafterclick();
        ToastMessage("success", result.data.message);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {}
  };

  const gotocart = () => {
    navigate("/cart");
  };

  const gotowishlist = () => {
    navigate("/liked");
  };

  const openmodal = () => {
    setShowmodal(!showmodal);
  };
  const handlecolor = (id, index, item) => {
    const newObj = {};
    newObj.selected = false;
    newObj.name = item;
    const sizeArray = item.product_size?.split(",").map((item, index) => {
      if (index === 0) {
        return {
          selected: true,
          name: item,
        };
      } else {
        return {
          selected: false,
          name: item,
        };
      }
    });
    setSize(sizeArray);
    setActievColorData(item);
    const colortoggle = match?.filter(
      (item) => item.color_name === info[index].color_name
    );
    setToggle(colortoggle);
    info?.map((item, ind) => {
      if (ind === index) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    setSizevalue(item?.product_size?.split(",")[0]);
    setColorcode(item.color_code);
    setColorname(item.color_name);
    setImageidvalue(item.id);
    setInfo([...info]);
  };

  const handlesizeclick = (index, item, array) => {
    const colortoggle = match?.filter(
      (item) => item?.product_size === info[index]?.product_size
    );
    setToggle(colortoggle);
    array.map((item) => (item.selected = false));
    array[index].selected = !array[index].selected;
    setSize(size, [item]);
    setSizevalue(item.name);
  };

  const categoryApi = async () => {
    const response = await getApiCall(categoryList);
    setCategoryName(response?.data?.data);
  };

  useEffect(() => {
    categoryApi();
  }, [paramId]);

  const checkArrName = () => {
    const data = categoryname?.filter((item) => details.categoryId === item.id);
    setBreadcumbcategory(data);
  };

  useEffect(() => {
    checkArrName();
  }, [paramId]);

  const checkAddedFunction = () => {
    const checkSelected = match.filter((item) => {
      return item.color_name === colorname && item.product_size === sizevalue;
    });
    return checkSelected.length;
  };

  return (
    <>
      <TopPageImage pagename="Product Details"></TopPageImage>

      {/* <!-- Product Detail --> */}

      <div
        className="productdetail_container"
        style={{
          background: "white",
        }}
      >
        <div className="product_detail_imagecontainer">
          {pending ? (
            <Skeleton
              variant="rectangular"
              minWidth={200}
              height={350}
              sx={{ backgroundColor: "#e0e0e0" }}
            />
          ) : (
            <>
              {/* <div className="imageGallery_container">
                <ImageGallery
                  items={images}
                  onClick={openmodal}
                  className="image_gallery_slider"
                  thumbnailPosition="bottom"
                  isRTL="true" 
                />
              </div> */}
              <Slider2
              // items={images}
              // onClick={openmodal}
              // className="image_gallery_slider"
              // thumbnailPosition="bottom"
              // isRTL="true"
              ></Slider2>
            </>
          )}
        </div>
        <div className="product_detail_infocontainer">
          {pending ? (
            <div className="productname_skeleton">
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                width={70}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />

              <div className="skeleton_color">
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                width={70}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <div className="skeleton_color">
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
                <Skeleton
                  variant="circle"
                  width={25}
                  height={25}
                  sx={{ backgroundColor: "#e0e0e0", borderRadius: "50%" }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
              <Skeleton
                variant="rectangular"
                minWidth={200}
                height={25}
                sx={{ backgroundColor: "#e0e0e0" }}
              />
            </div>
          ) : (
            <div className="p-r-50 p-t-5 p-lr-0-lg">
              <h4 className="productdetails_productname">
                {details.productName}
              </h4>

              <>
                {details.discount_percent === 0 ? (
                  <p className=" cl2 rupeesdiv">
                    <span className="mrpwithdiscount rupeesdiv">
                      <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />{" "}
                      {details.mrp_amount ? details.mrp_amount : details.price}
                    </span>
                    {details.is_active === 0 ? (
                      <p className="soldout">Sold Out</p>
                    ) : (
                      ""
                    )}
                  </p>
                ) : (
                  <p className=" cl2 rupeesdiv">
                    <span className="mrpwithdiscount">
                      <hr style={{ width: "100%" }} />
                      <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                      {details.discount_amount}
                    </span>
                    <strike className="discount_mrp rupeesdiv">
                      {details.mrp_amount ? details.mrp_amount : details.price}
                    </strike>{" "}
                    <span className="discount_percent rupeesdiv">
                      {details.discount_percent}% off{" "}
                    </span>
                    {details.is_active === 0 ? (
                      <p className="soldout">Sold Out</p>
                    ) : (
                      ""
                    )}{" "}
                  </p>
                )}
              </>

              <p className="exclusive">MRP is inclusive of all taxes</p>
              {details.is_active === 0 ? (
                ""
              ) : (
                <p className="instock">
                  {" "}
                  <img
                    src={instock}
                    height={20}
                    width={20}
                    alt="instock"
                  />{" "}
                  In-Stock, Ready to Ship
                </p>
              )}

              {info.length ? (
                <div className="input_container">
                  {info[0]?.color_code === "FreeColor" ? (
                    ""
                  ) : (
                    <div className="">
                      <div className="size-203  respon6 color-div">Color</div>
                      <div className="size_container">
                        {info?.map((item, index) => {
                          return (
                            <div
                              className="color_circle"
                              key={index}
                              onClick={() => handlecolor(item.id, index, item)}
                            >
                              {item.selected ? (
                                <RadioButtonCheckedIcon
                                  sx={{
                                    color: item.color_code,
                                    fontSize: "36px",
                                  }}
                                />
                              ) : (
                                <CircleIcon
                                  sx={{
                                    color: item.color_code,
                                    fontSize: "36px",
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {size[0]?.name === "FreeSize" || size[0]?.name === "" ? (
                    ""
                  ) : (
                    <div className=" p-b-10">
                      <div className="size-203  respon6">Size</div>

                      <div className="size_container">
                        {size.map((item, index) => {
                          return (
                            <>
                              {item?.name ? (
                                <div
                                  key={index}
                                  className={`${
                                    item.selected
                                      ? "size_circle_active"
                                      : "size_circle"
                                  } `}
                                  onClick={() =>
                                    handlesizeclick(index, item, size)
                                  }
                                >
                                  {item?.name ? item.name : ""}
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
              {/* ************* descrption of product *********** */}
              <hr />
              <div className="descriptionp">
                <RemoveTag
                  ParserText={details?.description}
                  style={{
                    fontSizesize: "14px",
                    lineHeight: "24px",
                    color: "red",
                    fontFamily: "sans-serif",
                    marginBottom: "0",
                  }}
                />
              </div>
              <hr />
              <p className="summary_icon">
                        <StarBorderOutlinedIcon />
                        Specification
                      </p>
              <div className="tavle_container">
                      <table>
                        <tbody>
                          {general.map((item, index) => (
                            <tr key={index}>
                              <td className="general_title">{item.title}</td>
                              <td>{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
<hr/>


              <p>Quantity</p>
              <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                <div
                  className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                  onClick={handleminus}
                >
                  <i className="zmdi zmdi-minus"></i>
                </div>

                <input
                  className="mtext-104 cl3 txt-center num-product"
                  type="number"
                  name="num-product"
                  value={counter}
                />

                <div
                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                  onClick={handleplus}
                >
                  <i className="fs-16 zmdi zmdi-plus"></i>
                </div>
              </div>

              <div className="cart_wishlist_container_desktop">
                {details.is_wishlist ? (
                  <button className="add_cart_btn" onClick={gotowishlist}>
                    <FavoriteIcon
                      sx={{ color: "var(--colorprimary)", marginRight: "5px" }}
                    />{" "}
                    Wishlisted
                  </button>
                ) : (
                  <button
                    className="add_cart_btn"
                    onClick={user_id ? handlelike : handleprofilePage}
                  >
                    <FavoriteIcon
                      sx={{ color: "var(--colorprimary)", marginRight: "5px" }}
                    />{" "}
                    Add to Wishlist{" "}
                  </button>
                )}
                {checkAddedFunction() ? (
                  <button
                    className={`${
                      details.is_active === 0 ? "wish_btn_disable" : "wish_btn"
                    } `}
                    disabled={cartbtnloading || details.is_active === 0}
                    onClick={gotocart}
                  >
                    <ShoppingCartIcon
                      sx={{ color: "var(--colorWhite)", marginRight: "5px" }}
                    />{" "}
                    Go to cart
                  </button>
                ) : (
                  <button
                    className={`${
                      details.is_active === 0 ? "wish_btn_disable" : "wish_btn"
                    } `}
                    disabled={cartbtnloading || details.is_active === 0}
                    onClick={user_id ? handlecart : handleprofilePage}
                  >
                    <ShoppingCartIcon
                      sx={{ color: "var(--colorWhite)", marginRight: "5px" }}
                    />{" "}
                    Add to cart{" "}
                  </button>
                )}
              </div>

              <div className="cart_wishlist_container">
                {details.is_wishlist ? (
                  <button className="cart_div1" onClick={gotowishlist}>
                    <FavoriteIcon
                      sx={{ color: "var(--colorprimary)", marginRight: "5px" }}
                    />{" "}
                    Wishlisted
                  </button>
                ) : (
                  <button
                    className="cart_div1"
                    onClick={user_id ? handlelike : handleprofilePage}
                  >
                    <FavoriteIcon
                      sx={{ color: "var(--colorprimary)", marginRight: "5px" }}
                    />{" "}
                    Add to Wishlist
                  </button>
                )}
                {checkAddedFunction() ? (
                  <button
                    className={`${
                      details.is_active === 0
                        ? "cart_div2_disable"
                        : "cart_div2"
                    } `}
                    disabled={cartbtnloading || details.is_active === 0}
                    onClick={gotocart}
                  >
                    <ShoppingCartIcon
                      sx={{ color: "var(--colorWhite)", marginRight: "5px" }}
                    />{" "}
                    Go to cart
                  </button>
                ) : (
                  <button
                    className={`${
                      details.is_active === 0
                        ? "cart_div2_disable"
                        : "cart_div2"
                    } `}
                    disabled={cartbtnloading || details.is_active === 0}
                    onClick={user_id ? handlecart : handleprofilePage}
                  >
                    <ShoppingCartIcon
                      sx={{ color: "var(--colorWhite)", marginRight: "5px" }}
                    />{" "}
                    Add to cart
                  </button>
                )}

                {showloginpopup ? (
                  <Login
                    handleafterloginaddtocart={handleafterloginaddtocart}
                    showloginpopup={showloginpopup}
                    setShowloginpopup={setShowloginpopup}
                    {...{ reload, setReload }}
                  />
                ) : (
                  ""
                )}
              </div>
{/* 
              <div className="details_container">
                {details.description ? (
                  <details>
                    <summary>
                      <p className="summary_icon">
                        <RemoveRedEyeOutlinedIcon />
                        Description
                      </p>{" "}
                      <KeyboardArrowDownOutlinedIcon />
                    </summary>
                    <RemoveTag ParserText={details?.description} />
                  </details>
                ) : (
                  ""
                )}

                {general.length ? (
                  <details>
                    <summary>
                      <p className="summary_icon">
                        <StarBorderOutlinedIcon />
                        Specification
                      </p>{" "}
                      <KeyboardArrowDownOutlinedIcon />
                    </summary>
                    <div className="tavle_container">
                      <table>
                        <tbody>
                          {general.map((item, index) => (
                            <tr key={index}>
                              <td className="general_title">{item.title}</td>
                              <td>{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                ) : (
                  ""
                )}


              </div> */}

             
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
