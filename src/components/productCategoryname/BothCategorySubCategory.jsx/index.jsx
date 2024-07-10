
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

const CategoryAndSubcategoryComponent = ({dropdownRef}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and subcategories data
        const response = await axios.get(
          "https://treasure.technotoil.com/category/get-categories-list"
        );
        if (response.data.status) {
          setCategories(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>...</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
        className="CategoryAndSubcategoryCon"
      >
        {/* <h2></h2> */}
        {categories.map((category) => (
          <ul key={category.id}>
            <li>
              <Link
                to={`/product/${category.id}/${category.category_name}`}
                className="bothList"
              >
                {category.category_name}
              </Link>
            </li>

            <ul>
              {category.subCategory.map((subcategory) => (
                <Link
                  to={`/product/${category.id}/${category.category_name}`}
                  className="bothList"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <li className="bothList" key={subcategory.id}
                  onClick={dropdownRef}
                  >
                    {subcategory.category_name}{" "}
                  </li>
                </Link>
              ))}
            </ul>
          </ul>
        ))}
      </div>
    </>
  );
};

export default CategoryAndSubcategoryComponent;
