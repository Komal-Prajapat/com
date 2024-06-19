import React, { useState } from 'react'
import "./index.css"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ImageUrl, addtowishlist, deleteApiCall, deleteFromWishlistApi, postApiCall } from '../../API/baseUrl';
import { useNavigate } from 'react-router-dom';
import Login from '../../Pages/login/login';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ProductBox = ({ renderproduct, shownav, setProductList, productList, reload, setReload }) => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id")
    const [showloginpopup, setShowloginpopup] = useState(false)




    const handleDetailPage = (id, name) => {
        const str = name.replace(/[^\w\s]/gi, '')
        navigate(`/productDetails/${id}/${str}`)
    }



    const handlelikeremove = async (id, index, type, user_id) => {
        if (user_id) {
            renderproduct[index].is_wishlist = !renderproduct[index].is_wishlist
            setProductList([...renderproduct])
            try {
                if (type === "remove") {
                    await deleteApiCall(`${deleteFromWishlistApi}/${user_id}/${id}`)
                    const maydata = renderproduct.filter(item => item.productId !== id)
                    setProductList(maydata)
                } else {
                    await postApiCall(addtowishlist, {
                        productId: id,
                        userId: user_id,
                    })
                }
            } catch (error) {
                console.log("error", error);
            }
        } else {
            setShowloginpopup(!showloginpopup)
        }
    }

    return (
        <>
            <div className="product_grid">
                {renderproduct.map((item, index) => {
                    return (
                        <div className='product_box'>
                            <div className="product_img_box">
                                <div className="product_img">
                                    <img onClick={() => handleDetailPage(item.productId ? item.productId : item.id, item.product_name ? item.product_name : item.productName)} className='product_image' src={`${ImageUrl}/${item.files ? item.files : item.file}`} alt="" />
                                </div>
                                <div className="product_icon">
                                    <ul>
                                        <li>
                                            <ShoppingBagOutlinedIcon disabled={item.is_active === 0 } sx={{ cursor: item.is_active === 0 ? "no-drop":"pointer" }} onClick={() => item.is_active === 0 ? "" : handleDetailPage(item.productId ? item.productId : item.id,item.product_name ? item.product_name : item.productName)} />
                                        </li>
                                        <li>
                                            {item.is_wishlist ?
                                                <FavoriteIcon sx={{ color: "var(--colorprimary)", cursor: "pointer" }} onClick={() => handlelikeremove(item.id ? item.id : item.productId, index, "remove", user_id)} />
                                                :
                                                <FavoriteBorderIcon sx={{ cursor: "pointer" }} onClick={() => handlelikeremove(item.id ? item.id : item.productId, index, "add", user_id)} />}

                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="product_box_description">
                            {item.discount_percent === 0 ? <p className='product_price'><span className='mrpwithdiscount'><CurrencyRupeeIcon sx={{fontSize:"16px"}}/> {item.discount_amount ? item.discount_amount : item.price}</span></p>
                            :
                            <p className='product_price'><span className='mrpwithdiscount'><CurrencyRupeeIcon sx={{fontSize:"16px"}}/>{item.discount_amount}</span><strike className='discount_mrp'>{item.mrp_amount ? item.mrp_amount : item.price}</strike> <span className='discount_percent'>{item.discount_percent}% off </span> </p>
                             }
                               
                                {item.is_active === 0 ? <p className='outofstock test-align'>Out Of Stock</p> :""}
                                <p className='product_name_con' >
                                <p className='product_name' onClick={() => handleDetailPage(item.productId ? item.productId : item.id , item.product_name ? item.product_name : item.productName)} >{item.product_name ? item.product_name : item.productName}</p>
                                </p>
                            </div>

                        </div>

                    )
                })}
                {showloginpopup ? <Login handlelike={handlelikeremove} showloginpopup={showloginpopup} setShowloginpopup={setShowloginpopup} wishlist='true' {...{reload, setReload}}
                /> : ""}
            </div>
        </>






        // <div className='product_box'>
        //     <div className="product_img_box">
        //         <div className="product_img">
        //             <img onClick={() => handleDetailPage(item.productId ? item.productId : item.id)} className='product_image' src={`${ImageUrl}/${item.files ? item.files : item.file}`} alt="" />
        //         </div>
        //         <div className="product_icon">
        //             <ul>
        //                 <li>
        //                     <ShoppingBagOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => handleDetailPage(item.productId ? item.productId : item.id)} />
        //                 </li>
        //                 <li>
        //                     {item.is_wishlist ?
        //                         <FavoriteIcon sx={{ color: "var(--colorprimary)", cursor: "pointer" }} onClick={() => handlelikeremove(item.id ? item.id : item.productId, "remove", user_id)} />
        //                         :
        //                         <FavoriteBorderIcon sx={{ cursor: "pointer" }} onClick={() => handlelikeremove(item.id ? item.id : item.productId, "add", user_id)} />}

        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        //     <div className="product_box_description">
        //         <p className='product_price'>RS {item.taxable_amount}</p>
        //         <p className='product_name'>{item.product_name ? item.product_name : item.productName}</p>
        //     </div>
        //     {showloginpopup ? <Login showloginpopup={showloginpopup} setShowloginpopup={setShowloginpopup} 
        //     // {...{reload , setReload}} 
        //     /> : ""}
        // </div>
    )
}

export default ProductBox;