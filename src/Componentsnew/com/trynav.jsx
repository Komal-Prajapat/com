import React, { useEffect, useState } from 'react';
import "./index.css";
import { Activecategory, Activesubcategory, getApiCall } from '../../API/baseUrl';
import { Link ,useLocation} from 'react-router-dom';
import DarkVariantExample from '../../slider/HomePageSlider';

const TryNav = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [subcategoryfilterList, setSubcategoryfilterList] = useState([]);
    const [catval, setCatval] = useState("");

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
        const myarray = subcategoryList.filter(item => item.parentId == id);
        setSubcategoryfilterList(myarray);
    };

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
      <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* <Link className="navbar-brand" to="/">Your Brand</Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {categoryList.map((item, index) => (
                            <li key={index} className="nav-item dropdown">
                                <Link
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    className={catval === item.category_name ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"}
                                    to={`/product/${item.id}/${item.category_name}`}
                                    onClick={() => handlecatClick(item.category_name)}
                                    onMouseOver={() => handlemouseover(item.id)}
                                >
                                    {item.category_name}
                                </Link>
                                <ul className="dropdown-menu">
                                    {subcategoryfilterList[0]?.parentId == item.id && (
                                        subcategoryfilterList.map((subcategory, index) => (
                                            <li key={index}>
                                                <Link
                                                    className='dropdown-item'
                                                    to={`/product/${subcategory.category_name}/${subcategory.id}/${subcategory.parentId}`}
                                                >
                                                    {subcategory.category_name}
                                                </Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>

        
      </>
    );
};

export default TryNav;
