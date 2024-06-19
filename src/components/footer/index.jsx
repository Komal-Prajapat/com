import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import logo from "../../Assect/logo.png";
import Login from "../../Pages/login/login";
import { Activecategory, getApiCall } from "../../API/baseUrl";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import instaicon from "../../Assect/instagram.svg";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import ButtonForAll from "../ButtonForALL";

const Footer = ({ catval, setCatval }) => {
  const user_id = localStorage.getItem("user_id");
  const [showloginpopup, setShowloginpopup] = useState(false);
  const [categoryList, setCategoryList] = useState(false);

  const handleprofilePage = () => {
    setShowloginpopup(!showloginpopup);
  };

  const handlecatClick = (name) => {
    setCatval(name);
  };
  const handleemptycatval = () => {
    setCatval("");
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

  return (
    <footer className=" footer container"
    style={{
      padding:'50px'
    }}
    >
      <div className="container">
        <div className="row footer_list">
          <div className="col-2-2 col-lg-3">

            <ul className="footer_links">
            <p className="footerheading">Categories</p>
              {categoryList.length
                ? categoryList?.map((name, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className=""
                          onClick={() => handlecatClick(name.category_name)}
                          to={`/product/${name.id}/${name.category_name}`}
                        >
                          {" "}
                          <p className=" ">
                            {" "}
                            {name.category_name}
                          </p>
                        </Link>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>

          <div className="col-2-2 col-lg-3 ">

            <ul className="footer_links">
            <p className="footerheading">Help</p>
              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/contact"
                  className=""
                >
                  Contact
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/help"
                  className=""
                >
                  FAQs
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/terms"
                  className=""
                >
                  Terms and Conditions
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/privacy"
                  className=""
                >
                  Privacy Policy
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/about"
                  className=""
                >
                  About Us
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/return"
                  className=" "
                >
                  Return Policy
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/refund"
                  className=" "
                >
                  Refund Policy
                </Link>
              </li>

              <li className="nospace">
                <Link
                  onClick={handleemptycatval}
                  to="/shipping"
                  className=" "
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-2-2 col-lg-3">
            <p className=" footerheading">
              GET IN TOUCH
            </p>

            {/* <p className="stext-107 footcolorlinks size-201 nospace">
							Any questions? <p style={{ color: "#ffffff", whiteSpace: "nowrap" }}>Let us know </p> <p style={{ color: "#ffffff", cursor: "pointer", whiteSpace: "nowrap" }}  onClick={handleemptycatval}>(+91) 92945 88000</p>
						</p> */}
            <p className="">
              Any questions?{" "}
              <p style={{ whiteSpace: "nowrap" }}>Let us know </p>
              <a
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                onClick={handleemptycatval}
                href="tel:+91 92945 88000"
                className="footcolorlinks"
              >
                (+91) 92945 88000
              </a>
            </p>

            <p className="stext-301 nospace footcolor p-b-10 p-t-15">
              Follow Us
            </p>
          </div>
        </div>

        {/* <div className=" container-footer">
					<div className='footer_logo_container'><img src={logo} alt='' className="footer_logo_img" /></div>

				</div> */}
        <div className="empty_footer_div"></div>

        <div className="social_links ">
          <div className="copy">
            <p>
              Copyright &copy; Outstock. All rights reserved. Powered by
              Theme_pure
            </p>
          </div>
          <div className="icon">
            <a
              href="https://www.instagram.com/treasureboxlife/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="footerSocialMediaIcon" />
            </a>
            <a
              href="https://www.facebook.com/treasureboxlife/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="footerSocialMediaIcon" />
            </a>
            <a href="https://www.google.com/maps/dir/22.710376,75.8417746/treasurebox/@22.7060118,75.8356895,15z">
              <CiLocationOn className="footerSocialMediaIcon" />
            </a>
          </div>
        </div>
      </div>
      {showloginpopup ? (
        <Login
          showloginpopup={showloginpopup}
          setShowloginpopup={setShowloginpopup}
        />
      ) : (
        ""
      )}
    </footer>
  );
};

export default Footer;
