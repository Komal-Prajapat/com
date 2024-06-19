import React from "react";
import "./index.css";
import Crousal from "../../components/crousal";
import Filter from "../../components/filter";
import { useState } from "react";
import ProductCard from "../../components/productCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Activecategory,
  ActivespecialProducts,
  ImageUrl,
  getApiCall,
  newarrival,
  postApiCall,
} from "../../API/baseUrl";
import ProductSkeleton from "./skeleton";
import Loader from "../../components/loader";

const HomePage = ({ reload, setReload }) => {
  const user_id = localStorage.getItem("user_id");

  const [shownav, setShownav] = useState(true);
  const [pending, setPending] = useState(false);
  const [userId, setUserId] = useState("");
  const [productList, setProductList] = useState([]);
  const [newarrivalList, setNewarrivalList] = useState([]);
  const [homeproductList, setHomeproductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, [reload]);

  const handlecategory = () => {
    navigate("/products");
  };

  const fetchProductList = async () => {
    setPending(true);
    try {
      const result = await postApiCall(ActivespecialProducts, {
        userId: userId ? userId : "",
      });

      if (result.data.status) {
        setHomeproductList(result.data.list);
        setProductList(result.data.list.products);
        setPending(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false);
    }
  };

  const fetchnewarrivalList = async () => {
    setPending(true);
    try {
      const result = await postApiCall(newarrival, {
        userId: userId ? userId : "",
      });

      if (result.data.status) {
        setNewarrivalList(result.data.list);
        setPending(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchnewarrivalList();
    fetchProductList();
  }, [userId, reload]);

  const fetchcategoryList = async () => {
    setPending(true);
    try {
      const result = await getApiCall(Activecategory);

      if (result.data.status) {
        setCategoryList(result.data.category);
        setPending(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchcategoryList();
  }, []);

  return (
    <>
      <div className="desktop_view ">
        {/* <Crousal /> */}
        {/* <!-- Banner --> */}
        <div className="sec-banner bg0 banner_container">
          <div className="container">
            {/* ======================================new arrival====================================================== */}
            <div className="head_btn_container">
              <h3>New Arrival</h3>
              <button className="btn_mbl" onClick={handlecategory}>
                View all
              </button>
            </div>
            <div className="newarrival_container">
              <ProductCard
                setProductList={setProductList}
                renderproduct={newarrivalList}
                shownav={shownav}
                productApifunc={fetchnewarrivalList}
              />
            </div>
 
            {/* {/* ======================================new arrival======================================================  */}
            <div className="row">
              {categoryList[0] ? (
                <div className="col-md-6 p-b-30 m-lr-auto">
                  {/* <!-- Block1 --> */}

                  <div className="block1 wrap-pic-w banner_img_woman">
                    <img
                      src={`${ImageUrl}${categoryList[0]?.files}`}
                      alt="IMG-BANNER"
                    />
                    <a
                      href="/products"
                      className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                    >
                      <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                          {categoryList[0]?.category_name}
                        </span>

                        <span className="block1-info stext-102 trans-04">
                          New Trend
                        </span>
                      </div>

                      <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                          Shop Now
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}

              {categoryList[1] ? (
                <div className="col-md-6 p-b-30 m-lr-auto">
                  {/* <!-- Block1 --> */}

                  <div className="block1 wrap-pic-w banner_img_woman">
                    <img
                      src={`${ImageUrl}${categoryList[1]?.files}`}
                      alt="IMG-BANNER"
                    />

                    <a
                      href="/products"
                      className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                    >
                      <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                          {categoryList[1]?.category_name}
                        </span>

                        <span className="block1-info stext-102 trans-04">
                          New Trend
                        </span>
                      </div>

                      <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                          Shop Now
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}

              {categoryList[2] ? (
                <div className="col-md-6 col-lg-4 p-b-30 m-lr-auto">
                  {/* <!-- Block1 --> */}

                  <div className="block1 wrap-pic-w banner_img_sm">
                    <img
                      src={`${ImageUrl}${categoryList[2]?.files}`}
                      alt="IMG-BANNER"
                    />

                    <a
                      href="/products"
                      className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                    >
                      <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                          {categoryList[2]?.category_name}
                        </span>

                        <span className="block1-info stext-102 trans-04">
                          New Trend
                        </span>
                      </div>

                      <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                          Shop Now
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
              {categoryList[3] ? (
                <div className="col-md-6 col-lg-4 p-b-30 m-lr-auto">
                  {/* <!-- Block1 --> */}

                  <div className="block1 wrap-pic-w banner_img_sm">
                    <img
                      src={`${ImageUrl}${categoryList[3]?.files}`}
                      alt="IMG-BANNER"
                    />

                    <a
                      href="/products"
                      className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                    >
                      <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                          {categoryList[3]?.category_name}
                        </span>

                        <span className="block1-info stext-102 trans-04">
                          New Trend
                        </span>
                      </div>

                      <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                          Shop Now
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* <!-- Block1 --> */}
              {categoryList[4] ? (
                <div className="col-md-6 col-lg-4 p-b-30 m-lr-auto">
                  <div className="block1 wrap-pic-w banner_img_sm">
                    <img
                      src={`${ImageUrl}${categoryList[4]?.files}`}
                      alt="IMG-BANNER"
                    />

                    <a
                      href="/products"
                      className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                    >
                      <div className="block1-txt-child1 flex-col-l">
                        <span className="block1-name ltext-102 trans-04 p-b-8">
                          {categoryList[4]?.category_name}
                        </span>

                        <span className="block1-info stext-102 trans-04">
                          New Trend
                        </span>
                      </div>

                      <div className="block1-txt-child2 p-b-4 trans-05">
                        <div className="block1-link stext-101 cl0 trans-09">
                          Shop Now
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="desktop_view_box">
          {/* <Filter shownav={shownav} /> */}

          {homeproductList.map((item, index) => {
            return (
              <>
                <div className="head_btn_container">
                  <h3>{item.title_name}</h3>
                  <button className="btn_mbl" onClick={handlecategory}>
                    View all
                  </button>
                </div>
                <div className="mbl_product_container">
                  <ProductCard
                    setProductList={setProductList}
                    renderproduct={item.products}
                    shownav={shownav}
                    productApifunc={fetchProductList}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="mobile_view_page">
        <div className="categories">
          {categoryList.map((category, index) => {
            return (
              <div className="category_lable">
                <img
                  className="category_img"
                  src={`${ImageUrl}${category?.files}`}
                  alt="Category"
                  onClick={handlecategory}
                />

                <p className="category_name" onClick={handlecategory}>
                  {category?.category_name}
                </p>
              </div>
            );
          })}
        </div>
        {/* <Crousal /> */}

        <div className="mbl_view_box">
          {/* <Filter shownav={shownav} /> */}

          {/* ======================================new arrival====================================================== */}
          <div className="head_btn_container">
            <h3>New Arrival</h3>
            <button className="btn_mbl" onClick={handlecategory}>
              View all
            </button>
          </div>
          <div className="newarrival_container">
            <ProductCard
              setProductList={setProductList}
              renderproduct={newarrivalList}
              shownav={shownav}
              productApifunc={fetchnewarrivalList}
            />
          </div>

          {/* {/* ======================================new arrival======================================================  */}

          {homeproductList.map((item, index) => {
            return (
              <>
                <div className="head_btn_container">
                  <h3>{item.title_name}</h3>
                  <button className="btn_mbl" onClick={handlecategory}>
                    View all
                  </button>
                </div>
                {pending ? (
                  <Loader />
                ) : (
                  <div className="mbl_product_container">
                    <ProductCard
                      setProductList={setProductList}
                      renderproduct={item.products}
                      {...{ reload, setReload }}
                      shownav={shownav}
                    />
                  </div>
                )}
              </>
            );
          })}
         
        </div>
      </div>
    </>
  );
};

export default HomePage;
