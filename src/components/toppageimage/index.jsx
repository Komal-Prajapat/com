import React from "react";
import { Link } from "react-router-dom";
import "./inde.css";
import { BsSlashLg } from "react-icons/bs";
import { RxSlash } from "react-icons/rx";

const TopPageImage = ({ pagename, bgimg }) => {
  const defaultBgImg =
    "https://ng-outstock.vercel.app/assets/img/page-title/page-title-1.jpg";

  return (
    <div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
          backgroundImage: `url(${bgimg || defaultBgImg})`,
          width: "100%",
          height: "70vh",
          backgroundSize: "cover",
        }}
      >
        <div>
          <h1 className="cl8 hov-cl1 trans-04 bread-crumbangle pageheading">
            {pagename}
          </h1>

          <ul
            style={{ display: "flex", justifyContent: "center" }}
            className="bread-crumbangle"
          >
            <li>
              <Link to="/" className="cl8 hov-cl1 trans-04 bread-crumbangle">
                Home
              </Link>
            </li>

            <li to="/product" className="cl8 hov-cl1 trans-04 bread-crumbangle">
            <RxSlash />            </li>

            <li>
              <Link
                to="/product"
                className="cl8 hov-cl1 trans-04 bread-crumbangle"
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopPageImage;
