import React, { useEffect } from 'react'
import "./index.css"
import Empty from '../emptypage/emptyCart'
import { ImageUrl, deleteApiCall, deleteFromcartApi, getApiCall, getcartApi, getdeliverycharge, postApiCall, quantitydecApi, quantityincApi } from '../../API/baseUrl';
import ToastMessage from '../../utils/ToastMessage';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Loader from '../../components/loader';
import emptycartlist from "../../Assect/cartempt.jpg";
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ButtonComponent from '../../components/button';

const Newcart = ({ reload, setReload }) => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id")
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    const [pending, setPending] = React.useState(false)
    const [price, setprice] = React.useState("")
    const [deliverycharge, setDeliverycharge] = React.useState("")
    const [discount, setDiscount] = React.useState("")
    const [deliverychargevalue, setDeliverychargevalue] = React.useState("")
    const [totalprice, setTotalprice] = React.useState("")

    const getCart = async () => {
        setPending(true)
        try {
            const result = await getApiCall(`${getcartApi}/${user_id}`)
            if (result?.data?.status) {
                setData(result?.data?.productDetails)
                setprice(result?.data?.cartTotalPrice)
                setDeliverycharge(result?.data?.deliveryCharges)
                setDiscount(result?.data?.discount)
                setTotalprice(result?.data?.totalCartValue)
                setPending(false)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        } finally {
            setPending(false)
        }
    }
    const refreshCart = async () => {
        try {
            const result = await getApiCall(`${getcartApi}/${user_id}`)
            if (result?.data?.status) {
                setData(result?.data?.productDetails)
                setprice(result?.data?.cartTotalPrice)
                setDeliverycharge(result?.data?.deliveryCharges)
                setDiscount(result?.data?.discount)
                setTotalprice(result?.data?.totalCartValue)
            } else {
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    const handleplus = async (id, index) => {
        setLoading(true)
        try {
            const result = await postApiCall(quantityincApi, {
                id: id,
                userId: user_id,
            })
            if (result?.data?.status) {
                setLoading(false)
                data[index].quantity = data[index].quantity + 1
                setData([...data])
                setReload(!reload)
                refreshCart()
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        } finally {
            setPending(false)
            setLoading(false)
        }
    }


    const handleminus = async (id, quantity, index) => {
        if (quantity === 1) {
        } else {
            setLoading(true)
            try {
                const result = await postApiCall(quantitydecApi, {
                    id: id,
                    userId: user_id,
                })
                if (result?.data?.status) {
                    setLoading(false)
                    data[index].quantity = data[index].quantity - 1
                    setData([...data])
                    refreshCart()
                    setReload(!reload)
                } else {
                    ToastMessage("error", result.data.message);
                }
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

    }

    const moveToCheckout = () => {
        const checkdata = data?.filter(check => check.is_active === 0)
        if(checkdata.length ){
            ToastMessage("error", "please remove out of stoke product from cart to move forward");
        }else{
            navigate("/checkout")
        }
    }

    const gotodetails = (id, name) => {
        navigate(`/productDetails/${id}/${name}`)
    }

    const deletefromCartAlert = (id) => {
        swal({
            title: "Are you sure you want to delete?",
            text: "Once deleted, You won't be able to revert this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deletefromCart(id)
            }
        });
    }

    const deletefromCart = async (id) => {
        try {
            const result = await deleteApiCall(`${deleteFromcartApi}/${user_id}/${id}`)
            if (result?.data?.status) {
                ToastMessage("success", result.data.message);
                const maydata = data.filter(item => item.productId !== id)
                setData(maydata)
                refreshCart()
                setReload(!reload)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        }
    }


    const handlegetdeliverycharge = async () => {
        try {
            const result = await getApiCall(getdeliverycharge)
            if (result.data.status) {
                setDeliverychargevalue(result.data.data.cart_value)
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        handlegetdeliverycharge();

    }, []);


    return (
        <div>
            {pending ? <Loader /> :
                <div className="newcart_container">
                    {
                        data.length ?
                            <div className="newcart_container_fluid">
                                {data.map((product, index) => {
                                    return (
                                        <div className='newcart_container_inside'>
                                            <div className='cartimg_container'>
                                                <img src={`${ImageUrl}${product.files}`} alt="IMG" onClick={() => gotodetails(product.productId, product.product_name)} />
                                            </div>
                                            
                                            <div className='newcart_product_container'>
                                                <div className='newcart_product_container_inside'>
                                                    <h3 className='cart_productname'>{product.product_name}</h3>
                                                    
                                                    {product.product_size === "FreeSize" ? "" : <p className=''>Size : {product.product_size}</p>}

                                                    {product.color_code === "FreeColor" ? "" : <p className='cart_productcolor'> Color : <CircleIcon sx={{ color: product.color_code, fontSize: "20px" }} /></p>
                                                    }

                                                </div>

                                                <div className='cart_quantity_remove_container'>

                                                   {product.is_active  === 0 ? <p className='oos'>Out Of Stock</p> : 
                                                
                                                    <div className="cart_quantity_container">
                                                        <button className="cart_quantitywrap" type='button' disabled={loading} onClick={() => handleminus(product.id, product.quantity, index)}>
                                                            <i className="fs-16 zmdi zmdi-minus"></i>
                                                          
                                                        </button>

                                                        <input className="cart_quantitywrap" type="number" name="num-product2" value={product.quantity} />

                                                        <button className="cart_quantitywrap" type='button' disabled={loading} onClick={() => handleplus(product.id, index)}>
                                                            <i className="fs-16 zmdi zmdi-plus"></i>
                                                            
                                                        </button>
                                                    </div>
                                                }
                                                    <div className="remove_btn_container">
                                                        <button className="icon-btn add-btn cart_delete_btn" onClick={() => deletefromCartAlert(product.id)}>
                                                            <DeleteIcon sx={{ color: "red", fontSize: "20px", marginTop: "5px" }} />
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                <div>
                                                    <p className='cart_product_mrp header-cart-item-rupee'><CurrencyRupeeIcon sx={{ fontSize: "16px" }} />{product.discount_percent === 0 ? product.mrp_amount : product.discount_amount}</p>
                                                </div>

                                            </div>




                                        </div>
                                    )
                                })}

                                <div>
                                    <div className="margin m-b-20 bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                                        <h4 className="mtext-109 cl2 p-b-10 bor12">
                                            Price Details
                                        </h4>

                                        <div className="bor12">
                                            <div className="d-flex">
                                                <div className="valuesize">
                                                    Price ({data.length} item) :
                                                </div>
                                                <div className="keysize header-cart-item-rupee">
                                                    <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />{Number(price).toFixed(2)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="d-flex">
                                                    <div className="valuesize">
                                                        Discount :
                                                    </div>
                                                    <div className="keysize header-cart-item-rupee">
                                                        <CurrencyRupeeIcon sx={{ fontSize: "16px" }} />{discount ? Number(discount).toFixed(2) : "0.00"}
                                                      </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='order_total_container_inside delivery-charge'>
                                                    <p className="valuesize">
                                                        Delivery Charges :
                                                    </p>
                                                    {deliverycharge === "Free" ? <p className="valuesize">{deliverycharge} </p> :
                                                        <p className="valuesize  header-cart-item-rupee"><CurrencyRupeeIcon sx={{ fontSize: "16px" }} />{deliverycharge}</p>
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                        <div className="margin m-b-25 d-flex">
                                            <div className="size-208">
                                                <span className="mtext-101 cl2">
                                                    Total :
                                                </span>
                                            </div>

                                            <div className="keysize">
                                                <span className="mtext-110 cl2 header-cart-item-rupee end">
                                                    <CurrencyRupeeIcon sx={{ fontSize: "18px" }} /> {Number(totalprice).toFixed(2)}
                                                 </span>
                                            </div>
                                        </div>
                                        <ButtonComponent type="submit" onClick={moveToCheckout} btn_name="Proceed to Checkout" />

                                        {deliverychargevalue === price || deliverychargevalue > price ? <p className='addmore_text justify-center'><p className='addmore_text'>* Add more products worth</p><p className='addmore_text'> <CurrencyRupeeIcon sx={{ fontSize: "18px", display: "flex" }} /> {Number(deliverychargevalue - price).toFixed(2)}</p> to avail Free Delivery</p>
                                            : ""}
                                    </div>
                                </div>
                            </div>
                            :
                            <Empty image={emptycartlist} btn="Shop Now" />
                    }
                </div>
            }
        </div>
    )
}

export default Newcart;