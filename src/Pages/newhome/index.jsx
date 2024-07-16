import React, { useEffect, useState } from "react";
import "./index.css";
import Crousal from "../../components/crousal";
import { FaArrowTurnUp } from "react-icons/fa6";

import {
  Activecategory,
  ImageUrl,
  getApiCall,
  getTitle,
  getfeaturedlist,
  gethometitleApi,
  newarrival,
  postApiCall,
} from "../../API/baseUrl";
import { useNavigate } from "react-router-dom";
import serviceicon1 from "../../Assect/leftimg1.avif";
import serviceicon2 from "../../Assect/service2.avif";
import serviceicon3 from "../../Assect/service3.png";
import serviceicon4 from "../../Assect/return-box.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from "../../Componentsnew/slider";
import { Skeleton } from "@mui/material";
import Homeskeleton from "./homeskeleton";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import HomePageSlider from "../../slider/HomePageSlider";
import HoomepageSlider2 from "../../slider/HomePageSlider2";
import BacktoHome from "../../components/backtohome";
import TwoConSlider from "../../slider/twoconSlider";
import Footer from "../../components/footer";

const Newhome = ({ reload, setReload, catval, setCatval }) => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [newarrivalList, setNewarrivalList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [titleList, setTitleList] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const handlecategory = (id, name) => {
    navigate(`/product/${id}/${name}`);
    setCatval(name);
  };

  const handlesubcategory = (id, name, parentid, catname) => {
    navigate(`/product/${name}/${id}/${parentid}`);
    setCatval(catname);
  };

  const fetchnewarrivalList = async () => {
    setPending(true);
    try {
      const result = await postApiCall(newarrival, {
        userId: user_id ? user_id : "",
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

  const fetchfeaturedList = async () => {
    setPending(true);
    try {
      const result = await getApiCall(getfeaturedlist);
      if (result.data.status) {
        setFeaturedList(result.data.List);
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
    fetchfeaturedList();
  }, [user_id]);

  const handlegetTitle = async () => {
    setPending(true);
    try {
      const result = await getApiCall(gethometitleApi);
      if (result.data.status) {
        setTitleList(result.data.allData);
        setPending(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    handlegetTitle();
  }, []);

  return (
    <>
      {/* <Crousal /> */}
      <div className="home_body_container ">
        <div className=" ">
          {/* <div className='home_body_container_one'>
          <div className='homebody_left_side_content'>

            <div className='homebody_left_side_content_box'>
              <div className='left_service_icon'>
                <img src={serviceicon1} alt="IMG-LOGO" />
              </div>
              <h3 className='left_service_title'>Delivering quality gifts</h3>
              <p className='left_service_text'>information on its origins</p>
            </div>


            <div className='homebody_left_side_content_box'>
              <div className='left_service_icon'>
                <img src={serviceicon2} alt="IMG-LOGO" />
              </div>
              <h3 className='left_service_title'>Gifts for all occasions</h3>
              <p className='left_service_text'>Variants and technical information</p>
            </div>

            <div className='homebody_left_side_content_box'>
              <div className='left_service_icon'>
                <img src={serviceicon3} alt="IMG-LOGO" />
              </div>
              <h3 className='left_service_title'>Great customer service</h3>
              <p className='left_service_text'>random Lipsum generator</p>
            </div>



            <div className='homebody_left_side_content_box'>
              <div className='left_service_icon'>
                <img src={serviceicon4} alt="IMG-LOGO" height={80} width={80}/>
              </div>
              <h3 className='left_service_title'>No Return / Exchange</h3>
              <p className='left_service_text'>random Lipsum generator</p>
            </div>



          </div>

        </div> */}

          <div
            className="home_body_container_two container "
       
          >
            {pending ? (
              <Homeskeleton />
            ) : (
              <div>
                <div className="home_body_container_inside">
                  <HomePageSlider></HomePageSlider>

                  {/* <div className='home_body_box_one'>
                {titleList[0]?.sub_categoryId ?
								 <img src={`${ImageUrl}${titleList[0]?.files}`} alt='' onClick={()=> titleList[0]?.sub_categoryId ?  handlesubcategory(titleList[0]?.sub_categoryId,titleList[0]?.subCategory_name,titleList[0]?.category_id,titleList[0]?.category_name) : ""}/>
								 :
								 <img src={`${ImageUrl}${titleList[0]?.files}`} alt='' onClick={()=>titleList[0]?.category_id ?  handlecategory(titleList[0]?.category_id,titleList[0]?.category_name) : ""} />
								}
                </div>

                  <div className='home_body_box_two'>
                   <div className='home_body_box_one'>
                {titleList[1]?.sub_categoryId ?
								 <img src={`${ImageUrl}${titleList[1]?.files}`} alt='' onClick={()=> titleList[1]?.sub_categoryId ?  handlesubcategory(titleList[1]?.sub_categoryId,titleList[1]?.subCategory_name,titleList[1]?.category_id,titleList[1]?.category_name) : ""}/>
								 :
								 <img src={`${ImageUrl}${titleList[1]?.files}`} alt='' onClick={()=>titleList[1]?.category_id ?  handlecategory(titleList[1]?.category_id,titleList[1]?.category_name) : ""} />
								}
                </div> 
                </div> */}
                </div>
                {featuredList.length ? (
                  <div
                    className="home_body_product_container "
                    data-aos="fade-right"
                  >
                    <HoomepageSlider2></HoomepageSlider2>

                    <div
                      class="row  d-flex"
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: "50px",
                        width:'90%',
                        margin:'auto'
                      }}
                    >
                      <hr class="headingLine1 col" style={{ width: "20%" }} />

                      <h3
                        class="home_body_product_heading col "
                        style={{ color: "black", textAlign: "center",width:"30%" }}
                      >
                        Trending Products
                        {/* Best Sellers */}
                      </h3>

                      <hr class="headingLine1 col" style={{ width: "20%" }} />
                    </div>
                    <p style={{ textAlign: "center" }} className="mb-5">
                    Discover the latest in-demand products everyone's talking about
                    </p>

                    <div className="home_body_product_head_container">
                      <div className="product_container">
                        <SliderComponent
                          newarrivalList={featuredList}
                          reload={reload}
                          setReload={setReload}
                          setNewarrivalList={setFeaturedList}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="home_body_container_inside">
                {/* <div className='home_body_box_two'> */}
                {/* <div className="home_body_box_one">
                  {titleList[3]?.sub_categoryId ? (
                    <img
                      src={`${ImageUrl}${titleList[3]?.files}`}
                      alt=""
                      onClick={() =>
                        titleList[3]?.sub_categoryId
                          ? handlesubcategory(
                              titleList[3]?.sub_categoryId,
                              titleList[3]?.subCategory_name,
                              titleList[3]?.category_id,
                              titleList[3]?.category_name
                            )
                          : ""
                      }
                    />
                  ) : (
                    <img
                      src={`${ImageUrl}${titleList[3]?.files}`}
                      alt=""
                      onClick={() =>
                        titleList[3]?.category_id
                          ? handlecategory(
                              titleList[3]?.category_id,
                              titleList[3]?.category_name
                            )
                          : ""
                      }
                    />
                  )}
                </div>
                <div className="home_body_box_one"> */}
                {/* {titleList[2]?.sub_categoryId ? (
                    <img
                      src={`${ImageUrl}${titleList[2]?.files}`}
                      alt=""
                      onClick={() =>
                        titleList[2]?.sub_categoryId
                          ? handlesubcategory(
                              titleList[2]?.sub_categoryId,
                              titleList[2]?.subCategory_name,
                              titleList[2]?.category_id,
                              titleList[2]?.category_name
                            )
                          : ""
                      }
                    />
                  ) : (
                    <img
                      src={`${ImageUrl}${titleList[2]?.files}`}
                      alt=""
                      onClick={() =>
                        titleList[2]?.category_id
                          ? handlecategory(
                              titleList[2]?.category_id,
                              titleList[2]?.category_name
                            )
                          : ""
                      }
                    />
                  )}
                </div> */}
                {/* </div> */}
                <div className="home_body_product_container">
                  <div className="home_body_product_head_container">
                    <div
                      class="row  d-flex"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "100px",
                           width:'90%',
                        margin:'auto'
                      }}
                    >
                      <hr class="headingLine1 col" style={{ width: "80px" }} />

                      <h3
                        class="home_body_product_heading col "
                        style={{ color: "black", textAlign: "center" }}
                      >
                        New Arrival
                      </h3>

                      <hr class="headingLine1 col" style={{ width: "80px" }} />
                    </div>
                    <p style={{ textAlign: "center" }} className="mb-5">
                    Check out our latest arrivals – just in time for you
                    </p>
                    <div className="newarrival_container">
                      <SliderComponent
                        {...{
                          newarrivalList,
                          setNewarrivalList,
                          reload,
                          setReload,
                        }}
                      />
                    </div>
                    <TwoConSlider></TwoConSlider>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BacktoHome></BacktoHome>
      {/* <Footer   bgcolor="#212529"  textcolor='white'  /> */}
    </>
  );
};

export default Newhome;
