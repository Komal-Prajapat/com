import React, { useEffect, useState } from 'react'
import { LikedHeading } from "../../components/heading";
import "./index.css"
import ToastMessage from '../../utils/ToastMessage';
import { getApiCall, getlikedProductApi } from '../../API/baseUrl';
import Loader from '../../components/loader';
import Empty from '../emptypage/emptyCart';
import emptyWishlist from "../../Assect/emptywishlist.png";
import ProductBox from '../../Componentsnew/productBox';
import TopPageImage from '../../components/toppageimage';
import ButtonForAll from '../../components/ButtonForALL';

const Liked = () => {
    const user_id = localStorage.getItem("user_id")
    const [productList, setProductList] = useState([]);
    const [pending, setPending] = useState(false);

    const getLiked = async () => {
        setPending(true)
        try {
            const result = await getApiCall(`${getlikedProductApi}/${user_id}`)
            if (result?.data?.status) {
                setProductList(result?.data?.productDetails)
                setPending(false)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        }finally{
            setPending(false)
        }
    }
  
    useEffect(() => {
        getLiked()
    }, [])

    const updateApiCall = async () => {
        try {
            const result = await getApiCall(`${getlikedProductApi}/${user_id}`)
            if (result?.data?.status) {
                setProductList(result?.data?.productDetails)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        }finally{
        }
      }
  


    return (
        <>


<TopPageImage pagename="Wishlist"></TopPageImage>
        {pending ? <Loader/> :
        <div>
            {productList.length ?
                <div>
                    <div className='wishlist_heading'>
                        {LikedHeading}
                    </div>
                <div className='wishlist_container'>
                      <ProductBox renderproduct={productList}  setProductList={setProductList}  productApifunc={updateApiCall} />
                </div>
                </div>
                :
               <div className="emptycon"> 
             <div className="data">
             <h3>No Wishlist Items Found</h3>
             <ButtonForAll name="CONTINUE SHOPING" className="btnWishlist"></ButtonForAll>
             </div>
               </div>
            }
            </div>
        }
        </>
    )
}

export default Liked;


