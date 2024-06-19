import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Box, Divider, Popper } from "@mui/material";
import { Skeleton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ToastMessage from "../../utils/ToastMessage";
import { IoBagHandleOutline, IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import {
  Activecategory,
  Activesubcategory,
  ImageUrl,
  baseUrl,
  carttotal,
  getApiCall,
  getdeliverycharge,
  logoutApi,
  postApiCall,
  searchhomeapi,
} from "../../API/baseUrl";
import swal from "sweetalert";
import headerlogo from "../../Assect/logo.png";
import carticon from "../../Assect/cartimg.png";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import shipicon from "../../Assect/shippingicon.png";
// import contacticon from "../../Assect/contacticon.png";

import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "../mobilemenu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Login from "../../Pages/login/login";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { Autocomplete, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "animate.css";
import Com from "../com";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TryNav from "../com/trynav";

const HeaderSection = ({
  reload,
  setReload, 
  fontval,
  setFontval,
  catval,
  setCatval,
}) => {
  const user_id = localStorage.getItem("user_id");
  const mobile = localStorage.getItem("mobile");
  const username = localStorage.getItem("name");
  const navigate = useNavigate();
  const [showloginpopup, setShowloginpopup] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE5, setAnchorE5] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [showmblMenu, setShowmblMenu] = useState(false);
  const [searchvisible, setSearchvisibal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchdata, setSearchdata] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategoryfilterList, setSubcategoryfilterList] = useState([]);
  const [sortByColumnName, setSortByColumnName] = useState("");
  const [deliverycharge, setDeliverycharge] = useState();
  const [cartcount, setCartcount] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [isSticky, setSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown1 = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clearsearch = () => {
    setSearch("");
    setCatval("");
  };

  const handlemouseover = (id) => {
    const myarray = subcategoryList.filter((item) => item.parentId == id);
    setSubcategoryfilterList(myarray);
  };
  const handlemouseout = () => {
    setSubcategoryfilterList([]);
  };

  const fetchcategoryList = async () => {
    try {
      const result = await getApiCall(Activecategory);
      if (result.data.status) {
        const categoryData = result.data.category.map((item) => {
          item.type = "category";
          return item;
        });
        setCategoryList(categoryData);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchcategoryList();
  }, []);

  const fetchsubcategoryList = async () => {
    try {
      const result = await getApiCall(Activesubcategory);
      if (result.data.status) {
        setSubcategoryList(result.data.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchsubcategoryList();
  }, []);

  const handleDetailPage = (id, name) => {
    const str = name.replace(/[^\w\s]/gi, "");
    navigate(`/productDetails/${id}/${str}`);
    setSearchdata([]);
    setCatval("");
  };

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setAnchorE3(anchorE3 ? null : event.currentTarget);
    setAnchorE5(anchorE5 ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const openproductDropdown = Boolean(anchorE5);
  const idproductDropdown = openproductDropdown ? "simple-popper" : undefined;

  const profileRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const productDropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target)
      ) {
        setAnchorE5(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openMobileProfile = Boolean(anchorE3);
  const idmobileprofile = openMobileProfile ? "simple-popper" : undefined;

  const profileRefmobile = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRefmobile.current &&
        !profileRefmobile.current.contains(event.target)
      ) {
        setAnchorE3(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const searchopen = Boolean(anchorE2);
  const searchid = searchopen ? "simple-popper" : undefined;

  const searchRef = useRef(null);

  const handlesearchClick = (event) => {
    setAnchorE2(anchorE2 ? null : event.currentTarget);
  };

  const handleAutocomplete = (data, val) => {
    setFontval(val.value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchdata([]);
        setSearch("");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const GotoProfile = () => {
    navigate("/profile");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };
  const gotocontact = () => {
    navigate("/contact");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
    toggleDropdown();
  };
  const gotoabout = () => {
    navigate("/about");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };
  const gotoshop = () => {
    navigate("/shop");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };

  const handleprofilePage = () => {
    setShowloginpopup(!showloginpopup);
  };

  const GotoOrders = () => {
    navigate("/order");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };

  const Gotocart = () => {
    navigate("/cart");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };

  const imageclick = () => {
    setCatval("");
  };

  const handlesearchPage = () => {
    navigate("searchpage");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };

  const handlelikePage = () => {
    navigate("/liked");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
  };

  const handlelogout = () => {
    setAnchorEl(null);
    setAnchorE3(null);
    swal({
      title: "Are you sure you want to logout?",
      text: "Once logged out, you can't get access to your Orders, Wishlist and Recommendations",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        logoutfromapp();
      }
    });
  };

  const logoutfromapp = async () => {
    try {
      const result = await postApiCall(`${logoutApi}/${user_id}`);
      if (result?.data?.status) {
        ToastMessage("success", result.data.message);
        localStorage.removeItem("user_id");
        localStorage.removeItem("mobile");
        localStorage.removeItem("name");
        setReload(!reload);
        getcartcount();
        navigate("/");
        setCatval("");
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlemblmenu = () => {
    setShowmblMenu(!showmblMenu);
  };
  const searchshow = () => {
    setSearchvisibal(!searchvisible);
  };

  const handleOnSearchChange = async (e) => {
    setAnchorE2(anchorE2 ? null : e.currentTarget);
    setSearch(e.target.value);
    try {
      const { data } = await baseUrl.post(searchhomeapi, {
        limit: limit,
        offset: offset,
        search: e.target.value,
        column_name: sortByColumnName,
        sort_by: sortBy === "asc" ? "DESC" : "ASC",
      });
      if (data.status) {
        setSearchdata(data.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  const handlegetdeliverycharge = async () => {
    setLoading(true);
    try {
      const result = await getApiCall(getdeliverycharge);
      if (result.data.status) {
        setLoading(false);
        setDeliverycharge(result.data.data.cart_value);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handlegetdeliverycharge();
  }, []);

  const getcartcount = async () => {
    try {
      const result = await postApiCall(carttotal, {
        userId: user_id ? user_id : "",
      });
      if (result.data.status) {
        setCartcount(result.data.count);
        setCartTotal(result.data.totalCartValue);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getcartcount();
  }, [reload]);

  const handlecatClick = (name) => {
    setCatval(name);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };




  const [isDropdownOpenProfile, setIsDropdownOpenProfile] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdownProfile = () => {
    setIsDropdownOpenProfile(!isDropdownOpenProfile);
  };

  // Function to close dropdown when clicking outside
  const handleClickOutsideProfile = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpenProfile(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideProfile);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProfile);
    };
  }, []);





  return (
    <div className={`headersection_container ${isSticky ? "sticky" : ""}`}>
      {/* ============================================ section 1 =================================================== */}
      <div
        className="headersection_container_one welcome_container "
        style={{ alignContent: "center" }}
      >
        <div className=" sectionBody">
          <div className="headersection_container_profile">
            <li className="col-lg-5">
              {" "}
              <Link to="/" className="web_logo_container_link ">
                <img
                  src={headerlogo}
                  alt="IMG-LOGO"
                  onClick={imageclick}
                  style={{ width: "200px", marginRight: "100px" }}
                />
              </Link>
            </li>
            <div  className=" col-lg-3 " style={{display:'flex'}}>
              <li
                className="profile_list navbarListItemsStyle mx-4 "
                onClick={gotoabout}
              >
                About
              </li>

              <li
                className="profile_list navbarListItemsStyle"
                onClick={gotocontact}
                // style={{color:'black' }}
              >
                Contact
              </li>
            </div>

            {/* 
            <li
              className="profile_list navbarListItemsStyle"
              
             
            >
              <div className="dropdown navbarListItemsStylex">
                <button className="dropbtn">
                  <span className="navbarListItemsStyle bold">
                    Shop <IoIosArrowDown />
                  </span>
                </button>
                <div className="dropdown-content shopdrop">
                  <TryNav></TryNav>
                </div>
              </div>
            </li> */}

            <div className="home_page_search_container col-lg-1 text-end">
              <div className="" ref={searchRef}>
                <div className="home_page_search_container">
                  <SearchIcon onClick={searchshow} className="NavbarICON " />

                  <input
                    className="search__input field__input navbarListItemsStyle"
                    id="Search-In-Modal"
                    type="search"
                    name="search"
                    autocomplete="off"
                    onChange={(e) => handleOnSearchChange(e)}
                    value={search}
                    placeholder="Search"
                    style={{ width: "60px", color:'black'}}
                  ></input>
                </div>
                {searchdata.length ? (
                  <div className="search_list_container">
                    {searchdata.length
                      ? searchdata.map((name, index) => {
                          return (
                            <div className="search_list_data" key={index}>
                              <div className="search_data_img_name">
                                <img
                                  onClick={() =>
                                    handleDetailPage(name.id, name?.productName)
                                  }
                                  className=""
                                  src={`${ImageUrl}/${
                                    name.files ? name.files : name.file
                                  }`}
                                  alt=""
                                  height={40}
                                  width={40}
                                />
                                <p
                                  className="product_list"
                                  onClick={() =>
                                    handleDetailPage(name.id, name?.productName)
                                  }
                                >
                                  {name?.productName}
                                </p>
                              </div>
                              <Divider />
                            </div>
                          );
                        })
                      : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* <li className="headersection_container_profile_Link_dis lightcolor">
              <Link to="/liked" onClick={imageclick}>
                <span className="navbarListItemsStyle">
                  {" "}
                  <CiHeart color="navbarListItemsStyle" /> Wishlist
                </span>
              </Link>
            </li> */}

            {/* <p onClick={handlelikePage} sx={{ color: "var(--colornewprimary)", cursor: "pointer" }}>Wishlist</p> */}

            {/* <div ref={profileRef}>
              <li
                onClick={handleClick}
                className="headersection_container_profile_contain"
              >
                <p className="profile_list navbarListItemsStyle">
                  {" "}
                  <IoPersonOutline className="navbarListItemsStyle" /> Profile
                </p>
              </li>
              <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box className="container_profile_fluid">
                  <div className="profile_container container_profile">
                    <div className="profile_container">
                      <div className="profile_logo_container"></div>

                      {username ? (
                        <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                          Hello {username}
                        </h6>
                      ) : (
                        <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                          Welcome
                        </h6>
                      )}

                      {user_id ? (
                        <p>{mobile}</p>
                      ) : (
                        <p className="profile_welcome_msg">
                          To access account and manage orders
                        </p>
                      )}

                      {user_id ? (
                        ""
                      ) : (
                        <button
                          className="login_btn_pr ofile"
                          onClick={handleprofilePage}
                        >
                          Login
                        </button>
                      )}
                    </div>
                    <Divider />
                    <div className="profile_container">
                      <p
                        className="profile_list "
                        onClick={user_id ? GotoProfile : handleprofilePage}
                      >
                        My Profile
                      </p>
                      <p
                        className="profile_list"
                        onClick={user_id ? GotoOrders : handleprofilePage}
                      >
                        Orders
                      </p>
                      <p
                        className="profile_list"
                        onClick={user_id ? handlelikePage : handleprofilePage}
                      >
                        Wishlist
                      </p>

                      {user_id ? <Divider sx={{ marginTop: "3px" }} /> : ""}
                      {user_id ? (
                        <p className="profile_list" onClick={handlelogout}>
                          Logout
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Box>
              </Popper>
            </div> */}
            <div className="cart_container_fluid">
              <div className="cart_icon">
                {/* <img onClick={Gotocart} src={carticon} alt="IMG-LOGO" /> */}
              </div>
              <div className="cart_price_count_container" onClick={Gotocart}>
                <p className="cart_text_count navbarListItemsStyle" style={{marginTop:'30px'}}>
                  <IoBagHandleOutline
                    onClick={Gotocart}
                    className="navbarListItemsStyle"
                  />{" "}
                  Cart({cartcount ? cartcount : 0})
                </p>
                <p className="cart_price_count header-cart-item-rupee">
                  {/* <CurrencyRupeeIcon className="navbarListItemsStyle"/>{" "} */}
                  {/* {cartTotal ? Number(cartTotal).toFixed(2) : "0.00"} */}
                </p>
              </div>
            </div>
            {/* <li className="headersection_container_profile_Link_dis">
              <LiveHelpIcon className="navbarListItemsStyle" />
              <Link to="/help" onClick={imageclick}>
                <span className="navbarListItemsStyle">FAQ</span>
              </Link>
            
            </li> */}
            <div className="dropdown-container1" ref={dropdownRef}>
      <li className="headersection_container_profile_Link_dis">
        <Link onClick={toggleDropdownProfile}>
          <FiAlignJustify style={{ fontSize: "25px" }} className="mx-3" />
        </Link>
      </li>
      {isDropdownOpenProfile && (
        <div className="dropdown-content1">
          <ul>
            <li className="">
              <div className="profile_container">
                <div className="profile_logo_container"></div>
                {username ? (
                  <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                    Hello {username}
                  </h6>
                ) : (
                  <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                    Welcome
                  </h6>
                )}
                {user_id ? (
                  <p>{mobile}</p>
                ) : (
                  <p className="profile_welcome_msg">
                    To access account and manage orders
                  </p>
                )}
                {!user_id && (
                  <button className="login_btn_profile" onClick={handleprofilePage}>
                    Login
                  </button>
                )}
              </div>
            </li>
            <hr></hr>
            <li style={{ color: " #c1bcbc" }}>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li style={{ color: " #c1bcbc" }}>
              <Link to={"/liked"}>Wishlist</Link>
            </li>
            <li style={{ color: " #c1bcbc" }}>
              <Link to={"/help"}>FAQ</Link>
            </li>
            <li style={{ color: " #c1bcbc" }}>
              <Link to={"/cart"}>Cart</Link>
            </li>
            <li style={{ color: " #c1bcbc" }}>
              <Link to={"/order"}>Order</Link>
            </li>
            <hr></hr>
            <li style={{ color: " #c1bcbc" }}>
              <Link to={"/logout"}>Log Out</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  



          </div>
        </div>
      </div>

      {/* ============================================ section 1 =================================================== */}
      <div className="headersection_container_one">
        <div className="headersection_container_two sectionBody">
          {/* <div className='web_logo_container'>
                        <Link to="/" className="web_logo_container_link">
                            <img src={headerlogo} alt="IMG-LOGO" onClick={imageclick} />
                        </Link>
                    </div> */}
          <div className="header_cart_container">
            <div className="contact_container_fluid">
              <div className="cart_icon">
                {/* <img src={shipicon} alt="IMG-LOGO" /> */}
                {/* <LocalShippingOutlinedIcon sx={{ fontSize: "40px", mt: 1 }} /> */}
              </div>
              {/* <div className='cart_price_count_container'>
                                <p className='shiping_text'>Free standard shipping</p>
                                {loading ?
                                    <Skeleton variant="rectangular" width={200} height={25} sx={{ backgroundColor: "#e0e0e0", borderRadius: "4px" }} />
                                    : <p className='cart_price_count header-cart-item-rupee'>on all orders {deliverycharge === 0 ? "" : <p className='cart_price_count header-cart-item-rupee' style={{ marginLeft: "5px" }}> over<CurrencyRupeeIcon sx={{ fontSize: "16px" }} /> {deliverycharge}</p>} </p>
                                }
                            </div> */}
            </div>

            <div className="contact_container_fluid">
              <div className="cart_icon">
                {/* <img src={contacticon} alt="IMG-LOGO" /> */}
                {/* <HeadsetMicOutlinedIcon sx={{ fontSize: "40px" }} /> */}
              </div>
              {/* <div className='cart_price_count_container'>
                                <p className='shiping_text'>treasurebox@gmail.com</p>
                                <p className='cart_price_count'></p>
                            </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="headersection_container_one nav_align">
        <div className="headersection_container_third sectionBody">
          <div
            className={`web_nav ${anchorEl === null ? "zindex" : "nozindex"}`}
          >
            {/* <Com {...{ catval, setCatval }} /> */}
          </div>

          <div className="web_mbl_nav" onClick={handlemblmenu}>
            <MenuIcon sx={{ cursor: "pointer", marginTop: "5px" }} />
          </div>

          {/* <div className='home_page_search_container'>
                        <div className="" ref={searchRef}>
                            <div className='home_page_search_container'>
                                <SearchIcon sx={{ color: "var(--colornewprimary)", fontSize: "20px" }} />
                                <input className="search__input field__input"
                                    id="Search-In-Modal" type="search"
                                    name="search" autocomplete="off"
                                    onChange={(e) => handleOnSearchChange(e)}
                                    value={search}
                                    placeholder="Search"></input>
                                {search.length ?
                                    <CloseIcon onClick={clearsearch} /> : ""
                                }
                            </div>

                            {searchdata.length ?
                                <div className="search_list_container" >
                                    {
                                        searchdata.length ?
                                            searchdata.map((name, index) => {
                                                return (
                                                    <div className="search_list_data" key={index}>
                                                        <div className="search_data_img_name">
                                                            <img onClick={() => handleDetailPage(name.id, name?.productName)} className='' src={`${ImageUrl}/${name.files ? name.files : name.file}`} alt="" height={40} width={40} />
                                                            <p className='product_list' onClick={() => handleDetailPage(name.id, name?.productName)} >{name?.productName}</p>
                                                        </div>
                                                        <Divider />
                                                    </div>
                                                )
                                            })
                                            : ""
                                    }

                                </div>
                                : ""}

                        </div>
                        <div className='mbl_search_cart_container'>
                            <SearchIcon sx={{ color: "var(--colornewprimary)", fontSize: "24px" }} />
                        </div>
                    </div> */}

          <div className="icon_list_header">
            <Badge
              className="cart_badge "
              color="secondary"
              badgeContent={cartcount}
            >
              <ShoppingCartIcon
                onClick={Gotocart}
                sx={{ color: "var(--colornewprimary)", cursor: "pointer" }}
              />
            </Badge>
            <FavoriteIcon
              onClick={handlelikePage}
              sx={{ color: "var(--colornewprimary)", cursor: "pointer" }}
            />
            <SearchIcon
              onClick={handlesearchPage}
              sx={{ color: "var(--colornewprimary)", cursor: "pointer" }}
            />
            <div className="headersection_container_profile_mobile">
              <div ref={profileRefmobile}>
                <li
                  onClick={handleClick}
                  className="headersection_container_profile_contain"
                >
                  <PersonIcon
                    sx={{ color: "var(--colornewprimary)", cursor: "pointer" }}
                  />
                </li>
                <Popper
                  id={idmobileprofile}
                  open={openMobileProfile}
                  anchorE1={anchorE3}
                >
                  <Box className="container_profile_fluid">
                    <div className="profile_container container_profile">
                      <div className="profile_container">
                        <div className="profile_logo_container">
                          <img src={headerlogo} alt="IMG-LOGO" width={150} />
                        </div>

                        {username ? (
                          <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                            Hello {username}
                          </h6>
                        ) : (
                          <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
                            Welcome
                          </h6>
                        )}

                        {user_id ? (
                          <p>{mobile}</p>
                        ) : (
                          <p className="profile_welcome_msg">
                            To access account and manage orders
                          </p>
                        )}

                        {user_id ? (
                          ""
                        ) : (
                          <button
                            className="login_btn_profile"
                            onClick={handleprofilePage}
                          >
                            Login
                          </button>
                        )}
                      </div>
                      <Divider />
                      <div className="profile_container">
                        <p
                          className="profile_list"
                          onClick={user_id ? GotoProfile : handleprofilePage}
                        >
                          My Profile
                        </p>
                        <p
                          className="profile_list"
                          onClick={user_id ? GotoOrders : handleprofilePage}
                        >
                          Orders
                        </p>
                        <p
                          className="profile_list"
                          onClick={user_id ? handlelikePage : handleprofilePage}
                        >
                          Wishlist
                        </p>
                        <p className="profile_list" onClick={gotocontact}>
                          Contact Us
                        </p>
                        <p className="profile_list " onClick={gotoabout}>
                          About Us
                        </p>
                        {user_id ? <Divider sx={{ marginTop: "3px" }} /> : ""}
                        {user_id ? (
                          <p className="profile_list" onClick={handlelogout}>
                            Logout
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Box>
                </Popper>
              </div>

              <li className="headersection_container_profile_Link_dis">
                <Link to="/help" onClick={imageclick}>
                  <span className="navbarListItemsStyle">FAQ</span>
                </Link>
              </li>
            </div>
          </div>

          {showmblMenu ? (
            <MobileMenu
              onClick={handlemblmenu}
              setShowmblMenu={setShowmblMenu}
              setCatval={setCatval}
            />
          ) : (
            ""
          )}
          {/* </div> */}

          {showloginpopup ? (
            <Login
              showloginpopup={showloginpopup}
              setShowloginpopup={setShowloginpopup}
              reload={reload}
              setReload={setReload}
              {...{ setCartTotal, setCartcount }}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      {/* <div className="headersection_category_img">
        {categoryList.map((item, index) => {
          return (
            <Link
              key={index}
              className={
                catval === item.category_name
                  ? "active_category-img category-img"
                  : "category-img"
              }
              onClick={() => handlecatClick(item.category_name)}
              to={`/product/${item.id}/${item.category_name}`}
            >
              {" "}
              <img src={`${ImageUrl}${item.files}`} alt="" />
            </Link>
          );
        })}
      </div> */}
    </div>
  );
};

export default HeaderSection;
