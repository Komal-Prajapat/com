import React, { useEffect } from 'react'
import { useState } from 'react'
import { ActiveProducts, Activecategory, Activesubcategory, categoryfilterApi, filterApi, getApiCall, postApiCall, subcategoryfilterApi } from '../../API/baseUrl'
import "./index.css"
import ProductBox from '../../Componentsnew/productBox'
import Newfilter from '../../components/newfilter'
import { Autocomplete, TextField } from '@mui/material'
import { useParams } from "react-router-dom"
import { Skeleton } from '@mui/material';
import Mobilefilter from '../../components/newfilter/mobilefilter'
import TopPageImage from "../../components/toppageimage";
import ButtonForAll from '../../components/ButtonForALL'
const SortByData = [
  {
    id: 4,
    name: "New Arrival",
    val: "New Arrival",
    selected: false,
    type: "sortby"
  },
  {
    id: 5,
    name: "Low to High",
    val: "Price : Low to High",
    selected: false,
    type: "sortby"
  },
  {

    id: 6,
    name: "High to Low",
    val: "Price : High to Low",
    selected: false,
    type: "sortby"
  },
]

const NewProductpage = ({ reload, setReload }) => {
  const { id } = useParams();
  const {name} = useParams();
  const {type} = useParams();
  const user_id = localStorage.getItem("user_id")
  const [sortval, setSortval] = useState([])
  const [renderproduct, setRenderproduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showfilter, setShowfilter] = useState(false)
  const [ranfgevaluefilter, setRanfgevaluefilter] = useState("");
  const [selectedlist, setSelectedlist] = useState([])
  const [categoryList, setCategoryList] = useState([]);
  const [categoryheading, setCategoryheading] = useState(false);
  const [categoryvalueforapi, setCategoryvalueforapi] = useState(name ? name : "");

  useEffect(() => {
    setCategoryvalueforapi(name ? name : "")
  }, [name]);

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
    }finally{
      setPending(false)
    }
  }

  const handleAutocomplete = async (data, val) => {
    const apicategory = selectedlist.filter(selector => selector.type === "category")
    setSortval(val.name)
    setPending(true)
    try {
      const result = await postApiCall(filterApi, {
        search: "",
        sort_by: val.name,
        price: ranfgevaluefilter,
        category_name: apicategory.length ? apicategory.map(item => item.category_name).join(",") : categoryvalueforapi,
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

  const categorygilterApiCall = async () => {
    if(type){
      setSelectedlist([])
      setPending(true)
      try {
        const result = await getApiCall(Activesubcategory)
        if (result.data.status) {
          const cat=  (result.data.data).filter(categoryList => categoryList.parentId === type)
          const categoryData = cat.map((item) => {
            item.type = "category"
            return item
          }) 
         const myvalue = categoryData.map((item) => {
            if (item.category_name === name) {
              item.selected = !item.selected;
            }
          })
        
          const catval = {
            id: type,
            category_name: name,
            type: "category",
          }
          setSelectedlist([catval]);
          setCategoryList([...myvalue])
          setCategoryList(categoryData)
          setPending(false)
        }
    } catch (error) {
        console.log("error", error);
    } finally {
      setPending(false)
    }
    }
    else{
      setSelectedlist([])
      setPending(true)
    try {
      const result = await postApiCall(`${categoryfilterApi}/${id}`)
      if (result.data.status) {
        setProductList(result.data.data)
        const categoryData = result.data.sub_category?.map((item) => {
          item.type = "category"
					return item
				})
        setCategoryList(categoryData)
        setPending(false)
        
      }
    } catch (error) {
      console.log("error", error);
    }finally{
      setPending(false)}
  }
}


  const subcategorygilterApiCall = async () => {
    setLoading(true)
      try {
        const result = await postApiCall(`${subcategoryfilterApi}/${id}`)
        if (result.data.status) {
          setProductList(result.data.data)
          setLoading(false)
        }
      } catch (error) {
        console.log("error", error);
      }finally{
        setLoading(false)}
    }

  const fetchcategoryList = async () => {
    try {
        const result = await getApiCall(Activecategory)
        if (result.data.status) {
            const categoryData = result.data.category.map((item) => {
                item.type = "category"
                return item
            })
            setCategoryList(categoryData)
            setCategoryheading(true)
        }
    } catch (error) {
        console.log("error", error);
    } finally {
    }
}

  useEffect(() => {
    if(type){
       subcategorygilterApiCall()
    }
    if (id) {
      categorygilterApiCall()
    }
    else {
      fetchProductList();
      setRenderproduct(productList);
      fetchcategoryList();
    }

  }, [id]);

  return (
    <div> 
       <div  className="TopPageForMobile">
       <TopPageImage pagename="Shop" bgimg="https://ng-outstock.vercel.app/assets/img/page-title/page-title-2.jpg"></TopPageImage>
</div>  
        
         

        <section className="bg0 section_container">
          <div className='mbl_product_filterbtn_container'>
            {/* <button className='invoice_btn' >Filter</button> */}
            <ButtonForAll name="Filter" onClick={handleFilter}/> 
          </div>

          {showfilter ? <Mobilefilter {...{categoryheading, showfilter, setShowfilter, sortval, setProductList, setSortval, selectedlist, setSelectedlist, ranfgevaluefilter, setRanfgevaluefilter }} /> : ""}
          <div className="newProduct_page_container">
            <div className='product_filter'>
              <Newfilter {...{categoryList,categoryvalueforapi, setCategoryList,categoryheading, showfilter, setShowfilter, sortval, setProductList, setSortval, selectedlist, setSelectedlist, ranfgevaluefilter, setRanfgevaluefilter }} />
            </div>

            <div className='product_sortby_container'>
              <div className='sortby_container_main'>
                <div className='sortby_container'>
                  <Autocomplete
                    disablePortal
                    disableClearable
                    size='small'
                    options={SortByData}
                    getOptionLabel={(option) => option.val}
                    isOptionEqualToValue={(option, value) => value.id === option.id}
                    onChange={(data, val) => handleAutocomplete(data, val,)}
                    renderInput={(params) => (
                      <TextField
                        size='small'
                        name="sort_by"
                        label="Sort by"
                        {...params}
                      />
                    )}
                  />
                </div>
              </div>
              

              {pending || loading ?
               <div className="Product_page_product_container">
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>
                <div>
                <Skeleton variant="rectangular" width={250}  height={200} sx={{backgroundColor:"#e0e0e0"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                <Skeleton variant="rectangular" width={250}  height={20} sx={{backgroundColor:"#e0e0e0",marginTop:"10px"}}/>
                </div>



              </div>
              : 
              <div className="Product_page_product_container" 
              style={{
                cursor:"pointer"
              }}>
              {
                productList.length ? 
                <ProductBox renderproduct={productList} setProductList={setProductList} productApifunc={updateApiCall} {...{ reload, setReload }} />
                  :
                   <div className='no-product_div'>Product Not Found</div>
              }

            </div>}

            </div>
          </div>
        </section>

    </div>
  )
}

export default NewProductpage