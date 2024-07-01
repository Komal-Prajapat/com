import { Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import './index.css'
import { ImageUrl, orderhistoryList, postApiCall } from '../../API/baseUrl';
import ToastMessage from '../../utils/ToastMessage';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader';
import moment from 'moment';
import Empty from '../emptypage/emptyCart';
import emptyorderlist from "../../Assect/emptyorder.jpg"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import TopPageImage from '../../components/toppageimage';


const Orders = () => {
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id")
    const [orderHistory, setOrderHistory] = useState([])
    const [pending, setPending] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setcurrentPage] = useState(1)

    const getOrderhistory = async () => {
        setPending(true)
        try {
            const result = await postApiCall(orderhistoryList, {

                userId: user_id,
                limit: 5,
                offset: currentPage,
                search: "",
                column_name: "",
                sort_by: ""
            })
            if (result?.data?.status) {
                setPending(false)
                setOrderHistory(result?.data?.data)
                setPageCount(result?.data?.total_count)
                

            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
        }
        finally {
            setPending(false)
        }
    }

    useEffect(() => {
        getOrderhistory()
    }, [currentPage])

    const handleDetails = async (id) => {
        navigate(`/orderdetails/${id}`)
    }

    const handleChange = (event, value) => {
        setcurrentPage(value);
      };

     

    return (
        <>
         <TopPageImage name="Oder"></TopPageImage>
            {pending ? <Loader /> :
<>
                <div className='orderhistory_container'>
                    {orderHistory?.length ?
                    //  <Pagination data={orderHistory} itemsPerPage={itemsPerPage} onChangePage={handlePageChange} />
                        <div className='orderhistory_container_fluid'>
                            {orderHistory?.map((val, index) => <div key={index}>
                                <Stack className='historyCompDivInside' onClick={() => handleDetails(val.order_id_fk)} >
                                    <div className='orderIdButtonAndTrack'>
                                    </div>
                                    <div className='productHistoryAndDeliveryDetailsClass'>


                                        <div className='orderDayAndDate'>

                                            <div className='orderOnAndTotalClass'>
                                                <div className='orderOnClass'>
                                                    <p >Order Id :</p>
                                                </div>
                                                <div className='orderOnDateClass'>
                                                    <p >{val.product_order_id}</p>
                                                </div>
                                            </div>

                                            <div className='orderOnAndTotalClass'>
                                                <div className='orderOnClass'>
                                                    <p >Order On :</p>
                                                </div>
                                                <div className='orderOnDateClass'>
                                                    <p >{moment(val.Date).format('MMMM Do YYYY')}</p>
                                                </div>
                                            </div>
                                            <div className='orderOnAndTotalClass'>
                                                <div className='orderOnClass'>

                                                    <p >Order Status :</p>
                                                </div>
                                                <div className='orderOnDateClass'>

                                                    <p >{val.orderStatus}</p>



                                                </div>
                                            </div>

                                            <div className='orderOnAndTotalClass'>
                                                <div className='orderOnClass'>

                                                    <p >Order Total :</p>


                                                </div>
                                                <div className='orderOnDateClass'>

                                                    <p className='header-cart-item-rupee'><CurrencyRupeeIcon sx={{ fontSize: "15px" }} /> {Number(val.total_order_amount).toFixed(2)}</p>



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Stack>

                            </div>)}
                            {orderHistory.length ? <Pagination count={Math.ceil(pageCount / 5)}  defaultPage={5} siblingCount={0}  page={currentPage} onChange={handleChange} /> : ""}
                        </div>
                        :
                     <div className="">
                     
                     <Empty image={emptyorderlist} btn="Shop Now" />
                     </div>
                    }
                </div>
               
                </>
            }
           
        </>
    )
}
export default Orders