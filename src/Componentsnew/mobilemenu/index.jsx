import React, { useState } from "react";
import headerlogo from "../../Assect/logo.png";
import "./index.css";
import { Link } from "react-router-dom";
import Login from "../../Pages/login/login";
import { Divider } from "@mui/material";
import { GoXCircle } from "react-icons/go";

const MobileMenu = ({ onClick, setShowmblMenu, setCatval }) => {
  const user_id = localStorage.getItem("user_id");
  const [showloginpopup, setShowloginpopup] = useState(false);

  const closemenu = () => {
    setShowmblMenu(false);
    setCatval("");
  };

  const handleprofilePage = () => {
    setShowloginpopup(!showloginpopup);
  };

  return (
    <>
      <aside className="mbl_menu_container">
        <div className="mbl_menu_container_inside">
          <div className="mbl_menu_close_icon" onClick={onClick}>
            <GoXCircle />
          </div>

          <div className="mbl_menu_items">
            <ul className="mbl_menu_ul_list">
             
              <li className="mbl_menu_li">
                <Link to="/" onClick={closemenu} className="">
                  Home
                </Link>
              </li>
              <Divider />
              <li className="mbl_menu_li">
                <Link to="/product" onClick={closemenu} className="">
                  Products
                </Link>
              </li>
              <Divider />
              <li className="mbl_menu_li">
                <Link to="/liked" onClick={closemenu} className="">
                  Wishlist
                </Link>
              </li>
              <Divider />
              <li className="mbl_menu_li">
                <Link to="/contact" onClick={closemenu} className="">
                  Contact Us
                </Link>
              </li>
              <Divider />
              <li className="mbl_menu_li">
                <Link to="/about" onClick={closemenu} className="">
                  About Us
                </Link>
              </li>
              <Divider />
            </ul>
          </div>
        </div>
      </aside>
      {showloginpopup ? (
        <Login
          showloginpopup={showloginpopup}
          setShowloginpopup={setShowloginpopup}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MobileMenu;
