/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./index.css"
import { ActiveProducts, postApiCall } from '../../API/baseUrl'
import Filter from '../../components/filter'
import Loader from '../../components/loader'
import CloseIcon from '@mui/icons-material/Close';
import ProductCard from "../../Pages/products/index.jsx"
import ProductBox from '../../Componentsnew/productBox'

const Products = () => {
  const user_id = localStorage.getItem("user_id")
  const [renderproduct, setRenderproduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [pending, setPending] = useState(false);
  const [limit, setLimit] = useState("");
  const [showfilter, setShowfilter] = useState(false)

  const handleFilter = () => {
    setShowfilter(!showfilter)
  }

  const fetchProductList = async () => {
    setPending(true)
    try {
      const result = await postApiCall(ActiveProducts, {
        userId: user_id ? user_id : "",
      })

      if (result.data.status) {
        setProductList(result.data.data)
        setPending(false)
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setPending(false)
    }
  }
  const updateApiCall = async () => {
    try {
      const result = await postApiCall(ActiveProducts, {
        userId: user_id ? user_id : "",
      })
      if (result.data.status) {
        setProductList(result.data.data)
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  useEffect(() => {
    fetchProductList();
    setRenderproduct(productList);
  }, [user_id]);


  const allProductFilter = JSON.parse(JSON.stringify(productList))

  return (
    <>
      {pending ? <Loader /> :
        <section className="bg0 section_container">
          <div className="container">
            <div className="bg0 m-t-23  Product_container">
              {/* {ProductsHeading}
            {filter ? "" :
              <div className="flex-w m-tb-10">
                <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter"
                  onClick={handleFilter}>
                  {showfilter ? <CloseIcon sx={{ fontSize: "14px", marginRight: "2px", color: "#000" }} /> :
                    <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                  }
                  Filter
                </div>
              </div>
              // <Navbar productList={allProductFilter} allProduct={productList} setRenderproduct={setRenderproduct} />
            } */}
              <div className={`filter_div_container ${showfilter ? "fitervisible" : "filterinvisible"} `}>
                <Filter setShowfilter={setShowfilter} showfilter={showfilter} showtext="true" setProductList={setProductList} />
              </div>

              <div className="container">
                <div className="row isotope-grid products_card_container_fluid">
                  {/* {productList.map((item, index) => {
                    return (
                      // <ProductBox {...{ item, index }} />
                    )
                  })} */}
                  <ProductCard renderproduct={productList} setProductList={setProductList} productApifunc={updateApiCall} />
                </div>
              </div>

            </div>
          </div>
        </section>

      }
    </>
  )
}

export default Products;


// import React from 'react'

// const Products = () => {
//   return (
//     <div>Products</div>
//   )
// }

// export default Products