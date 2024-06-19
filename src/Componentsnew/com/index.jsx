import React, { useEffect, useState } from 'react';
import "./index.css";
import { Activecategory, Activesubcategory, getApiCall } from '../../API/baseUrl';
import { Link, useLocation } from 'react-router-dom';
import DarkVariantExample from '../../slider/HomePageSlider';

const Com = ({ catval, setCatval }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [subcategoryfilterList, setSubcategoryfilterList] = useState([]);

    const handlecatClick = (name) => {
        setCatval(name);
    };

    const handlesubcatClick = (id) => {
        const categoryhighlight = categoryList.filter(category => category.id == id);
        setCatval(categoryhighlight[0]?.category_name);
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

    const  handlemouseover = (id) => {
        const myarray = subcategoryList.filter(item => item.parentId == id);
        setSubcategoryfilterList(myarray);
    };

    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return (
      <>            <header className='' data-aos="fade-right">
                <nav>
                    <ul className="navigation-menu navoverflow">
                        {categoryList.map((item, index) => (
                            <li key={index} className='ListItems'>
                                <Link className={catval === item.category_name ? "activecat" : "catval"} to={`/product/${item.id}/${item.category_name}`} onClick={() => handlecatClick(item.category_name)} onMouseOver={() => handlemouseover(item.id)}>
                                    <span className='navbarListItemsStyle'>{item.category_name}</span>
                                </Link>
                                {subcategoryfilterList[0]?.parentId == item.id &&
                                    <ul className='catdropdown_subcatcontainer'>
                                        {subcategoryfilterList.map((subcategory, index) => (
                                            <li key={index}>
                                                <Link onClick={() => handlesubcatClick(subcategory.parentId)} className='subcatval navbarListItemsStyle' to={`/product/${subcategory.category_name}/${subcategory.id}/${subcategory.parentId}`}>
                                                    <span>{subcategory.category_name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            
            </>

     
    );
};

export default Com;
