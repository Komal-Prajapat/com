import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";
import { getApiCall } from "../../API/baseUrl";
import CategoryList from "../productCategoryname";
// import { getApiCall } from '../../API/baseUrl';

const SearchBar = ({
  handleOnSearchChange,
  setSearch,
  search,
  border,
  onClose,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getApiCall("");
        if (result.data.status) {
          setCategories(result.data.category);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <Popup
      position="right center"
      trigger={
        <button>
          <div
            className={`${border ? "border" : "search_container"}`}
            style={{
              background: "white",
              width: "100vw",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <div
              className="header__search-header"
              style={{ textAlign: "center" }}
            >
              <RxCross2
                className="searchcross"
                style={{
                  marginRight: "5px",
                  marginLeft: "15px",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: " var(--primary-color)",
                  fontWeight: "bold",
                }}
                onClick={onClose}
              />
              <h3
                className="searchheading"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#323232",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  marginTop: "10px",
                }}
              >
                Search
              </h3>
            </div>
            {/* <div className="SearchBarCategoryListForMobile">
              <CategoryList></CategoryList>
            </div> */}

            <div
              className="search_input_container"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                margin: "auto",
                width: "90%",
              }}
            >
              <input
                className="searchinput"
                name="search-product"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => handleOnSearchChange(e)}
                onBlur={onClose}
                type="search"
                autoFocus={true}
                style={{
                  height: "40px",
                  width: "100vw",
                  borderBottom: "1px solid var(--primary-color)",
                  padding: "0 15px",
                  boxSizing: "border-box",
                }}
              />
              {/* {search && (
                <CloseIcon
                  onClick={clearSearch}
                  style={{
                    cursor: 'pointer',
                    marginLeft: 'autp',
                    fontSize: '20px',
                    color: ' var(--primary-color)',
                  }}
                />

              )} */}
              <CiSearch
                className="searchicon_searchPage"
                style={{
                  marginLeft: "-20px",
                  color: "black",
                  fontSize: "20px",
                }}
              />
            </div>
          </div>
        </button>
      }
      className="popup-animation"
    />
  );
};

export default SearchBar;
