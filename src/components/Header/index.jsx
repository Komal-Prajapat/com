import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import headerlogo from "../../Assect/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../sidebar";
import CartPreview from "../../Pages/cart/cart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import PWAInstallerPrompt from "react-pwa-installer-prompt";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Login from "../../Pages/login/login";
import ToastMessage from "../../utils/ToastMessage";
import {hederlogoForMobile}  from '../../../public/images/hederlogoMobile.png'
import {
  getApiCall,
  getcartApi,
  logoutApi,
  postApiCall,
  searchhomeapi,
} from "../../API/baseUrl";
import swal from "sweetalert";
import SearchPage from "../../Pages/searchPage";
import SearchBar from "../searchBar";
import { Box, Button, Divider, Menu, MenuItem, Popper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Header = ({ reload, setReload, refresh, setRefresh }) => {
  const user_id = localStorage.getItem("user_id");
  const mobile = localStorage.getItem("mobile");
  const username = localStorage.getItem("name");
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showloginpopup, setShowloginpopup] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchdata, setSearchdata] = useState([]);
  const [sortByColumnName, setSortByColumnName] = useState("");
  const [showsearchlist, setShowsearchlist] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobilenumber, setMobilenumber] = React.useState(mobile);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state for menu toggle


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlemblprofileClick = (event) => {
    setAnchorE2(anchorE2 ? null : event.currentTarget);
  };

  const profileopen = Boolean(anchorE2);
  const profileid = profileopen ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const divRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowsearchlist(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const divmblprofileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        divmblprofileRef.current &&
        !divmblprofileRef.current.contains(event.target)
      ) {
        setAnchorE2(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  const handleOnSearchChange = async (e) => {
    setSearch(e.target.value);
    try {
      const result = await postApiCall(searchhomeapi, {
        limit: limit,
        offset: offset,
        search: e.target.value,
        column_name: sortByColumnName,
        sort_by: sortBy === "asc" ? "DESC" : "ASC",
      });
      if (result.data.status) {
        setSearchdata(result.data.data);
        setShowsearchlist(true);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const onBlur = () => {
    if (searchdata.length) {
    }
  };
  const handleDesktopmenu = () => {
    setShowDesktopMenu(!showDesktopMenu);
  };
  const handleCart = () => {
    navigate("/cart");
  };

  const handlelikePage = () => {
    navigate("/liked");
    setAnchorEl(null);
    setAnchorE2(null);
  };

  const handleSearchPage = () => {
    navigate("/searchpage");
  };

  const GotoOrders = () => {
    navigate("/order");
    setAnchorEl(null);
    setAnchorE2(null);
  };

  const GotoProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
    setAnchorE2(null);
  };
  const gotocontact = () => {
    navigate("/contact");
    setAnchorEl(null);
    setAnchorE2(null);
  };

  const handleprofilePage = () => {
    setShowloginpopup(!showloginpopup);
    setAnchorEl(null);
    setAnchorE2(null);
  };

  const getCart = async () => {
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getCart();
  }, [refresh, reload]);

  const handlelogout = () => {
    setAnchorEl(null);
    setAnchorE2(null);
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
        setRefresh(!refresh);
        setReload(!reload);
        navigate("/");
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const closemenu = () => {
    setShowMenu(false);
  };
  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const handleListClick = (id) => {
    navigate(`/productDetails/${id}`);
    setShowsearchlist(false);
  };

  return (
    <>
      {/* <!-- Header --> */}
    <div className={isNavbarFixed ? "navbar-fixed" : "navbar"}>
        <header className="header-v3 navbar navbar-expand-lg navbar-light navbar-custom">
        {/* <!-- Header desktop --> */}
        <div className="container-menu-desktop trans-03">
          <div className="wrap-menu-desktop">
            <nav className="limiter-menu-desktop p-l-45">
              {/* <!-- Logo desktop -->*/}
              <Link to="/" className="logo animate__animated animate__bounce">
                <img src={headerlogo} alt="IMG-LOGO" />
              </Link>
              <div className="flex-c-m h-full justify">
                {/* <!-- Menu desktop --> */}
                <div className="menu-desktop">
                  <ul className="main-menu">
                    <li className={splitLocation[1] === "home" ? "active" : ""}>
                      <Link to="">Home</Link>
                    </li>

                    <li
                      className={
                        splitLocation[1] === "products" ? "active" : ""
                      }
                    >
                      <Link to="/products">Products</Link>
                    </li>

                    <li
                      className={splitLocation[1] === "about" ? "active" : ""}
                    >
                      <Link to="/about">About</Link>
                    </li>

                    <li
                      className={splitLocation[1] === "contact" ? "active" : ""}
                    >
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>

                {/* ===============================search======================================== */}
                <div className="flex-c-m h-full padding">
                  <div ref={divRef} className="search_container_desktop">
                    <SearchBar
                      border="true"
                      {...{ handleOnSearchChange, setSearch, search, onBlur }}
                    />
                    <Divider />
                    {showsearchlist ? (
                      <div className="searchList_container">
                        {searchdata.map((item) => {
                          return (
                            <>
                              <li
                                style={{ cursor: "pointer" }}
                                onClick={() => handleListClick(item.id)}
                                className="search_list"
                              >
                                {item.productName}
                              </li>
                              <Divider />
                            </>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* ===============================search======================================== */}

                  {/* <!-- Icon header --> */}
                  {/* <div className="wrap-icon-header header_right_side_icons flex-w flex-r-m h-full"> */}

                  <div
                    className="flex-c-m h-full margin_left "
                    ref={profileRef}
                  >
                    {/* <li onClick={user_id ?handlelogout : handleprofilePage} style={{ display: "flex", alignItems: "center" }} className={splitLocation[1] === "login" ? "active" : ""}> */}
                    <li
                      onClick={handleClick}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                      className={splitLocation[1] === "login" ? "active" : ""}
                    >
                      <PersonIcon />
                      <p style={{ cursor: "pointer", fontWeight: 500 }}>
                        Profile
                      </p>
                    </li>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                      <Box className="container_profile_fluid">
                        <div className="profile_container container_profile">
                          <div className="profile_container">
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
                              <p>To access account and manage orders</p>
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
                          <Divider />
                          <div className="profile_container">
                            <p
                              className="profile_list"
                              onClick={
                                user_id ? GotoProfile : handleprofilePage
                              }
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
                              onClick={
                                user_id ? handlelikePage : handleprofilePage
                              }
                            >
                              Wishlist
                            </p>
                            <p className="profile_list" onClick={gotocontact}>
                              Contact Us
                            </p>
                            {user_id ? (
                              <Divider sx={{ marginTop: "3px" }} />
                            ) : (
                              ""
                            )}
                            {user_id ? (
                              <p
                                className="profile_list"
                                onClick={handlelogout}
                              >
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

                  <div className="flex-c-m h-full margin_left ">
                    {user_id ? (
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                        className={splitLocation[1] === "cart" ? "active" : ""}
                      >
                        <div
                          onClick={handleCart}
                          className="icon-header-itemcart cl0 trans-04 icon-header-notification "
                          data-notify={data.length}
                        >
                          <i className="zmdi zmdi-shopping-cart desktopcart hov-color"></i>
                        </div>
                        <Link to="/cart" className="login_cart_btn">
                          Cart
                        </Link>
                      </li>
                    ) : (
                      <li
                        onClick={handleprofilePage}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                        className={splitLocation[1] === "cart" ? "active" : ""}
                      >
                        <div className="icon-header-itemcart cl0 trans-04">
                          <i className="zmdi zmdi-shopping-cart desktopcart hov-color"></i>
                        </div>
                        <p
                          style={{
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "14px",
                          }}
                          onClick={handleprofilePage}
                          data-notify={user_id ? data.length : "0"}
                        >
                          Cart
                        </p>
                      </li>
                    )}
                  </div>

                  <div className="flex-c-m h-full margin_left ">
                    {user_id ? (
                      <li
                        onClick={handlelikePage}
                        style={{ display: "flex", alignItems: "center" }}
                        className={splitLocation[1] === "liked" ? "active" : ""}
                      >
                        <FavoriteBorderIcon
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                        />
                        <Link to="/liked" className="login_cart_btn">
                          Wishlist
                        </Link>
                      </li>
                    ) : (
                      <li
                        onClick={handleprofilePage}
                        style={{ display: "flex", alignItems: "center" }}
                        className={splitLocation[1] === "liked" ? "active" : ""}
                      >
                        <FavoriteBorderIcon
                          sx={{ fontSize: "20px", cursor: "pointer" }}
                        />
                        <p
                          style={{ cursor: "pointer", fontWeight: 500 }}
                          onClick={handleprofilePage}
                        >
                          Wishlist
                        </p>
                      </li>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* <!-- Header Mobile --> */}
        <div className="wrap-header-mobile mobile_view">
          {/* <!-- Logo moblie -->		 */}
          <div className="logo-mobile">
            <Link to="/" className="logo">
              <img src="https://tse1.mm.bing.net/th?id=OIP.6VJpiEB8bvznoRMNRDREjQHaB1&pid=Api&P=0&h=180" alt="IMG-LOGO" />
            </Link>
          </div>

          {/* <!-- Icon header --> */}

          <div className="wrap-icon-header flex-w flex-r-m h-full">
            <PWAInstallerPrompt
              render={({ onClick }) => (
                <div className="">
                  <div
                    className="icon-header-item cl0 hov-cl1 trans-04  "
                    onClick={onClick}
                  >
                    <AddIcon
                      sx={{
                        color: "#000",
                        fontSize: "24px",
                        marginRight: "5px",
                      }}
                      className="hov-color"
                    />
                  </div>
                </div>
              )}
            />

            <div className="flex-c-m h-full ">
              <div
                className="icon-header-item cl0 hov-cl1 trans-04"
                aria-describedby={profileid}
                type="button"
                onClick={handlemblprofileClick}
                ref={divmblprofileRef}
              >
                <AccountCircleIcon
                  sx={{ color: "#000", fontSize: "24px", marginRight: "5px" }}
                  className="hov-color"
                />
              </div>
              {/* <TriggerButton aria-describedby={id} type="button" onClick={handlemblprofileClick}>
								Toggle Popper
							</TriggerButton> */}
              <Popper id={profileid} open={profileopen} anchorEl={anchorE2}>
                <Box className="container_profile_fluid">
                  <div className="profile_container container_profile">
                    <div className="profile_container">
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
                        <p>To access account and manage orders</p>
                      )}

                      {user_id ? (
                        ""
                      ) : (
                        <button
                          className="login_btn_profile"
                          onClick={user_id ? handlelogout : handleprofilePage}
                        >
                          {user_id ? "Logout" : "Login"}
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
              {/* {user_id ?
								<div className="icon-header-item cl0 hov-cl1 trans-04  " onClick={handlelogout}>
									<AccountCircleIcon sx={{ color: "#000", fontSize: "24px", marginRight: "5px" }} className='hov-color' />
								</div>

								:
								<div className="icon-header-item cl0 hov-cl1 trans-04  " onClick={handleprofilePage}>
									<AccountCircleIcon sx={{ color: "#000", fontSize: "24px", marginRight: "5px" }} className='hov-color' />
								</div>
							} */}
            </div>
            <div className="flex-c-m h-full ">
              <div
                className="icon-header-item cl0 hov-cl1 trans-04  "
                onClick={handleSearchPage}
              >
                <SearchIcon
                  sx={{ color: "#000", fontSize: "24px", marginRight: "5px" }}
                  className="hov-color"
                />
              </div>
            </div>

            <div className="flex-c-m h-full ">
              {user_id ? (
                <div
                  className="icon-header-item cl0 hov-cl1 trans-04  "
                  onClick={handlelikePage}
                >
                  <FavoriteBorderIcon
                    sx={{ color: "#000", fontSize: "24px" }}
                    className="hov-color"
                  />
                </div>
              ) : (
                <div
                  className="icon-header-item cl0 hov-cl1 trans-04  "
                  onClick={handleprofilePage}
                >
                  <FavoriteBorderIcon
                    sx={{ color: "#000", fontSize: "24px" }}
                    className="hov-color"
                  />
                </div>
              )}
            </div>

            {user_id ? (
              <div
                className={`flex-c-m h-full  bor6 ${
                  showCart ? "show-modal1" : ""
                }`}
                onClick={handleCart}
              >
                <div
                  className="icon-header-item cl0 trans-04 p-lr-11 icon-header-noti "
                  data-notify={data.length}
                >
                  <i className="zmdi zmdi-shopping-cart hov-color"></i>
                </div>
              </div>
            ) : (
              <div
                className={`flex-c-m h-full  bor6 ${
                  showCart ? "show-modal1" : ""
                }`}
                onClick={handleprofilePage}
              >
                <div className="icon-header-item cl0 trans-04 p-lr-11  ">
                  <i className="zmdi zmdi-shopping-cart hov-color"></i>
                </div>
              </div>
            )}

            <div className="flex-c-m h-full">
              <div
                className="icon-header-item cl0 trans-04 p-lr-11 "
                onClick={handleMenu}
              >
                {showMenu ? (
                  <CloseIcon
                    sx={{ fontSize: "30px", color: "#000" }}
                    className="hov-color"
                  />
                ) : (
                  <i className="zmdi zmdi-menu hov-color"></i>
                )}
              </div>
            </div>
          </div>
        </div>










        {/* <!-- Button show menu --> */}

        {/* <!-- Menu Mobile --> */}
        {showMenu ? (
          <div class="menu-mobile">
            <ul className="main-menu-m">
              <li className={splitLocation[1] === "home" ? "active" : ""}>
                <Link to="/" onClick={closemenu}>
                  Home
                </Link>
              </li>

              <li className={splitLocation[1] === "products" ? "active" : ""}>
                <Link to="/products" onClick={closemenu}>
                  Products
                </Link>
              </li>

              <li className={splitLocation[1] === "about" ? "active" : ""}>
                <Link to="/about" onClick={closemenu}>
                  About
                </Link>
              </li>

              <li className={splitLocation[1] === "contact" ? "active" : ""}>
                <Link to="/contact" onClick={closemenu}>
                  Contact
                </Link>
              </li>

              <li className={splitLocation[1] === "liked" ? "active" : ""}>
                <Link to="/liked" onClick={closemenu}>
                  Wishlist
                </Link>
              </li>

              <li className={splitLocation[1] === "liked" ? "active" : ""}>
                <Link to="/order" onClick={closemenu}>
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </header>

      {/* <!-- Sidebar --> */}
      {showDesktopMenu ? (
        <Sidebar
          onClick={handleDesktopmenu}
          setShowDesktopMenu={setShowDesktopMenu}
        />
      ) : (
        ""
      )}

      {showCart ? <CartPreview onClick={handleCart} showCart={showCart} /> : ""}

      {showloginpopup ? (
        <Login
          {...{
            reload,
            setReload,
            showloginpopup,
            setShowloginpopup,
            refresh,
            setRefresh,
            setMobilenumber,
          }}
        />
      ) : (
        ""
      )}
    </div>
    </>
  );
};

export default Header;
