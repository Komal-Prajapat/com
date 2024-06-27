import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import {
  Activecategory,
  Activesubcategory,
  getApiCall,
} from "../../API/baseUrl";
import { Link, useLocation } from "react-router-dom";

const TryNav = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategoryfilterList, setSubcategoryfilterList] = useState([]);
  const [catval, setCatval] = useState("");
  const [showTryNav, setShowTryNav] = useState(false); // State to manage visibility of TryNav
  const tryNavRef = useRef(null); // Ref for TryNav component

  const handlecatClick = (name) => {
    setCatval(name);
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
    }
  };

  const fetchsubcategoryList = async () => {
    try {
      const result = await getApiCall(Activesubcategory);
      if (result.data.status) {
        setSubcategoryList(result.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchcategoryList();
    fetchsubcategoryList();
  }, []);

  const handlemouseover = (id) => {
    const myarray = subcategoryList.filter((item) => item.parentId == id);
    setSubcategoryfilterList(myarray);
  };

  const location = useLocation();
  const { pathname } = location;

  // Handle click outside TryNav to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tryNavRef.current && !tryNavRef.current.contains(event.target)) {
        setShowTryNav(false);
      }
    };

    if (showTryNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTryNav]);

  // Toggle TryNav visibility
  const toggleTryNav = () => {
    setShowTryNav((prev) => !prev);
  };

  return (
    <>
    <div className="navbar">
<ul className="navbar-nav">
              {categoryList.map((item, index) => (
                <li key={index} className="">
                  <Link
                    
                    role="button"
            
                 
                  
                    to={`/product/${item.id}/${item.category_name}`}
                    onClick={() => handlecatClick(item.category_name)}
                    onMouseOver={() => handlemouseover(item.id)}
                    style={{
                      cursor: "pointer",
                    }}
                    className="category_nameList"
                  >
                    {item.category_name}
                  </Link>
                  <ul >
                    {subcategoryfilterList[0]?.parentId == item.id &&
                      subcategoryfilterList.map((subcategory, index) => (
                        <li key={index}>
                          <Link
                            className="subcategory_nameList"
                            to={`/product/${subcategory.category_name}/${subcategory.id}/${subcategory.parentId}`}
                            
                          >
                            {subcategory.category_name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
</div>
    </>
  );
};

export default TryNav;
