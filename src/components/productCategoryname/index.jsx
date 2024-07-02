import React, { useEffect, useState } from "react";
import "./index.css";
import { Activecategory, getApiCall } from "../../API/baseUrl";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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
      console.log("Error fetching categories:", error);
    }
  };

  return (
    <div className="category-list">
      <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
        {categoryList.map((category, index) => (
          <li key={index} className="category-item">
            <Link
            
              to={`/product`}
              className="category-link"
            >
              {category.category_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
