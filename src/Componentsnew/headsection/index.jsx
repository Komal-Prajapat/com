import PersonIcon from "@mui/icons-material/Person";
import { Box, Divider, Popper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ToastMessage from "../../utils/ToastMessage";
import "./index.css";

import swal from "sweetalert";
import {
  Activecategory,
  Activesubcategory,
  CategoryAndSubcategoryApi,
  ImageUrl,
  baseUrl,
  carttotal,
  getApiCall,
  getdeliverycharge,
  logoutApi,
  postApiCall,
  searchhomeapi,
} from "../../API/baseUrl";
import headerlogo from "../../Assect/logo.png";
// import contacticon from "../../Assect/contacticon.png";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import "animate.css";
import Login from "../../Pages/login/login";
import TryNav from "../com/trynav";
import MobileMenu from "../mobilemenu";
import SearchPage from "../../Pages/searchPage";
import CategoryAndSubcategoryComponent from "../../components/productCategoryname/BothCategorySubCategory.jsx";

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
  const [showTryNav, setShowTryNav] = useState(false);

  // Function to toggle the state
  const toggleTryNav = () => {
    setShowTryNav(!showTryNav);
  };

  // const toggleDropdown1 = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

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
    setShowTryNav(false);
  };
  const gotocontact = () => {
    navigate("/contact");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
    toggleDropdown();
    setShowTryNav(false);
  };
  const gotoabout = () => {
    navigate("/about");
    setCatval("");
    setAnchorEl(null);
    setShowTryNav(false);
    setAnchorE3(null);
  };
  const gotohelp = () => {
    navigate("/help");
    setCatval("");
    setAnchorEl(null);
    setShowTryNav(false);
    setAnchorE3(null);
  };
  const gotoshop = () => {
    navigate("/shop");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
    setShowTryNav(false);
  };

  const handleprofilePage = () => {
    setShowloginpopup(!showloginpopup);
  };

  const GotoOrders = () => {
    navigate("/order");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
    setShowTryNav(false);
  };

  const Gotocart = () => {
    navigate("/cart");
    setCatval("");
    setAnchorEl(null);
    setShowTryNav(false);
    setAnchorE3(null);
    setShowTryNav(false);
  };

  const imageclick = () => {
    setCatval("");
    setShowTryNav(false);
  };

  const handlesearchPage = () => {
    navigate("searchpage");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
    setShowTryNav(false);
  };

  const handlelikePage = () => {
    navigate("/liked");
    setCatval("");
    setAnchorEl(null);
    setAnchorE3(null);
    setShowTryNav(false);
  };

  const handlelogout = () => {
    setAnchorEl(null);
    setAnchorE3(null);
    setShowTryNav(false);
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
        setShowTryNav(false);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlemblmenu = () => {
    setShowmblMenu(!showmblMenu);
    setShowTryNav(false);
  };
  const searchshow = () => {
    setSearchvisibal(!searchvisible);
    setShowTryNav(false);
  };

  const handleOnSearchChange = async (e) => {
    setAnchorE2(anchorE2 ? null : e.currentTarget);
    setShowTryNav(false);
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
      setShowTryNav(false);
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
    document.addEventListener("mousedown", handleClickOutsideProfile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    };
  }, []);

  const [showTryNav1, setShowTryNav1] = useState(false);
  const tryNavRef1 = useRef(null); // Ref to reference the TryNav component

  // Function to handle clicks outside TryNav to close it
  const handleClickOutside = (event) => {
    if (tryNavRef1.current && !tryNavRef1.current.contains(event.target)) {
      setShowTryNav1(false);
    }
  };

  // Effect to add click event listener when showTryNav is true
  useEffect(() => {
    if (showTryNav1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTryNav1]);

  // Toggle function to show/hide TryNav
  const toggleTryNav1 = () => {
    setShowTryNav1((prev) => !prev);
  };

  // *************************
  // ************SEarch *************
  // *************************

  const [showPopup, setShowPopup] = useState(false);

  const handleSearchClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  //   ****************************
  //   Shop Component hidden
  // *************************

  const [isDropdownOpenShop, setIsDropdownOpenShop] = useState(false);
  const dropdownRefShop = useRef(null);

  useEffect(() => {
    const handleOutsideClickShop = (event) => {
      if (
        dropdownRefShop.current &&
        !dropdownRefShop.current.contains(event.target)
      ) {
        setIsDropdownOpenShop(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClickShop);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickShop);
    };
  }, []);

  const toggleDropdownShop = () => {
    setIsDropdownOpenShop(!isDropdownOpenShop);
  };

  return (
    <>
      <div
        className={`headersection_container container-fluid ${
          isSticky ? "sticky" : ""
        }`}
      >
        {/* ============================================ section 1 =================================================== */}
        <div className="headersection_container_one welcome_container  desktopNavbar ">
          <div className=" sectionBody">
            <li className="">
              {" "}
              <Link to="/" className="web_logo_container_link ">
                <img
                  src={headerlogo}
                  alt="IMG-LOGO"
                  onClick={imageclick}
                  style={{ width: "200px" }}
                />
              </Link>
            </li>

            <li
              className="profile_list navbarListItemsStyle"
              ref={dropdownRefShop}
            >
              <div className="dropdown navbarListItemsStylex d-flex">
                <button className="dropbtn" onClick={toggleDropdownShop}>
                  <span className="navbarListItemsStcyle bold">
                    Shop <IoIosArrowDown className="navbarListItemsStyle" />
                  </span>
                </button>
                <div className="">
                  <div
                    className="shoplistdata mx-3"
                    style={{ width: "1220px" }}
                  >
                    {isDropdownOpenShop && <CategoryAndSubcategoryComponent />}
                  </div>
                </div>
              </div>
            </li>

            <li
              className="profile_list navbarListItemsStyle "
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

            <li>
              {" "}
              <button onClick={handleSearchClick}>Search</button>
              {showPopup && (
                <div className="popup">
                  <div className="popup-content">
                    <button className="close-button" onClick={handleClosePopup}>
                      close
                    </button>
                    <SearchPage onClose={handleClosePopup} />
                  </div>
                </div>
              )}
            </li>

            <li onClick={Gotocart} sx={{ cursor: "pointer" }}>
              {" "}
              <IoBagHandleOutline
                onClick={Gotocart}
                className="navbarListItemsStyle my-3"
                sx={{ cursor: "pointer" }}
                style={{
                  marginTop: "20px ",
                }}
              />{" "}
              <span
                className="               
                  Cart({cartcount ? cartcount : 0})
          "
              >
                Cart({cartcount ? cartcount : 0})
              </span>
            </li>

            <li>
              {" "}
              <div className="dropdown-container1" ref={dropdownRef}>
                <li className="headersection_container_profile_Link_dis">
                  <Link onClick={toggleDropdownProfile}>
                    <FiAlignJustify
                      style={{ fontSize: "25px", color: "black" }}
                      className="mx-3"
                    />
                  </Link>
                </li>
                {isDropdownOpenProfile && (
                  <div className="dropdown-content1">
                    <ul>
                      <li className="">
                        <div className="profile_container"
                        style={{
                          padding:"10px "
                        }}
                        >
                     
                          {username ? (
                            <h4
                              style={{
                                color: "#bc8246",
                                fontWeight: 600,
                                paddingTop: "3px",
                              }}
                            >
                              Hello {username}
                            </h4>
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
                              onClick={
                                user_id ? handlelogout : handleprofilePage
                              }
                            >
                              {user_id ? "Logout" : "Login"}
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
                      <li style={{ color: " #c1bcbc" }}></li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </div>
        </div>

        {/* ============================================ 
              *************Mobile device*************
          =================================================== */}

        <div className=" mobilenavbar">
          <div className="logo-mobile">
            <Link to="/" className="logo">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.6VJpiEB8bvznoRMNRDREjQHaB1&pid=Api&P=0&h=180"
                alt="IMG-LOGO"
              />
            </Link>
          </div>
          <div className="d-flex mobilenavbarLink">
            <li
              className=""
              onClick={handlemblmenu}
              style={{
                justifyContent: "start",
              }}
            >
              <MenuIcon sx={{ cursor: "pointer" }} className="mobiletoggle" />
            </li>

            <div
              className="listofmoabilenavbar"
              style={{
                justifyContent: "end",
                display: "flex",
              }}
            >
              <li>
                {" "}
                <button onClick={handleSearchClick}>Search</button>
                {showPopup && (
                  <div className="popup">
                    <div className="popup-content">
                      <button
                        className="close-button"
                        onClick={handleClosePopup}
                      >
                        close
                      </button>
                      <SearchPage onClose={handleClosePopup} />
                    </div>
                  </div>
                )}
              </li>

              <li className="icon_list_header">
                <Badge
                  className="cart_badge"
                  color="black"
                  badgeContent={cartcount}
                >
                  <IoBagHandleOutline
                    onClick={Gotocart}
                    style={{
                      marginLeft: "31px",
                      fontSize: "16px",
                      color: "black",
                      marginRight: "2px",
                    }}
                    sx={{ cursor: "pointer" }}
                  />
                  Cart..({cartcount ? cartcount : 0})
                </Badge>
              </li>
              {/* Profile section */}
              <li className="headersection_container_profile_mobile">
                <div ref={profileRefmobile}>
                  <li
                    onClick={handleClick}
                    className="headersection_container_profile_contain"
                  >
                    <FiAlignJustify style={{ cursor: "pointer" }} />
                  </li>
                  <Popper
                    id={idmobileprofile}
                    open={openMobileProfile}
                    anchorE1={anchorE3}
                  >
                    <Box className="container_profile_fluid">
                      {/* Profile container */}
                      <div className="profile_container container_profile">
                        {/* Profile content */}
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

                      {/* Additional profile links */}
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
                        <p className="profile_list" onClick={handlelikePage}>
                          Wishlist
                        </p>
                        <p className="profile_list" onClick={gotocontact}>
                          Contact Us
                        </p>
                        <p className="profile_list" onClick={gotoabout}>
                          About Us
                        </p>
                        <p className="profile_list" onClick={gotohelp}>
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
                    </Box>
                  </Popper>
                </div>

                {/* Help link */}
              </li>

              {/* Mobile Menu */}
              {showmblMenu && (
                <MobileMenu
                  onClick={handlemblmenu}
                  setShowmblMenu={setShowmblMenu}
                  setCatval={setCatval}
                />
              )}

              {/* Login Popup */}
              {showloginpopup && (
                <Login
                  showloginpopup={showloginpopup}
                  setShowloginpopup={setShowloginpopup}
                  reload={reload}
                  setReload={setReload}
                  {...{ setCartTotal, setCartcount }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default HeaderSection;
