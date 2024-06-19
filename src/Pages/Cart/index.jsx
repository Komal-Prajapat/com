aimport React from "react";
import "../products/index.css";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  ImageUrl,
  deleteApiCall,
  deleteFromcartApi,
  getApiCall,
  getcartApi,
  postApiCall,
  quantitydecApi,
  quantityincApi,
} from "../../API/baseUrl";
import ToastMessage from "../../utils/ToastMessage";
import { useEffect } from "react";
import RemoveTag from "../../components/removetag";
import Loader from "../../components/loader";
import Empty from "../emptypage/emptyCart";
import emptycartlist from "../../Assect/emptycart.png";
import swal from "sweetalert";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import TopPageImage from "../../components/toppageimage";

const Cart = ({ refresh, setRefresh }) => {a
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [counter, setCounter] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [price, setprice] = React.useState("");

  const getCart = async () => {
    setPending(true);
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setprice(result?.data?.cartTotalPrice);
        setPending(false);
        setCounter();
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setPending(false);
    }
  };
  const refreshCart = async () => {
    try {
      const result = await getApiCall(`${getcartApi}/${user_id}`);
      if (result?.data?.status) {
        setData(result?.data?.productDetails);
        setprice(result?.data?.cartTotalPrice);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleplus = async (id, index) => {
    setLoading(true);
    try {
      const result = await postApiCall(quantityincApi, {
        id: id,
        userId: user_id,
      });
      if (result?.data?.status) {
        setLoading(false);
        data[index].quantity = data[index].quantity + 1;
        setData([...data]);
        refreshCart();
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
    } finally {
      setPending(false);
      setLoading(false);
    }
  };

  const handleminus = async (id, quantity, index) => {
    if (quantity === 1) {
      setCounter(counter);
    } else {
      setLoading(true);
      try {
        const result = await postApiCall(quantitydecApi, {
          id: id,
          userId: user_id,
        });
        if (result?.data?.status) {
          setLoading(false);
          data[index].quantity = data[index].quantity - 1;
          setData([...data]);
          refreshCart();
        } else {
          ToastMessage("error", result.data.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  const moveToCheckout = () => {
    navigate("/checkout");
  };

  const gotodetails = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const deletefromCartAlert = (id) => {
    swal({
      title: "Are you sure you want to delete?",
      text: "Once deleted, You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletefromCart(id);
      }
    });
  };

  const deletefromCart = async (id) => {
    try {
      const result = await deleteApiCall(
        `${deleteFromcartApi}/${user_id}/${id}`
      );
      if (result?.data?.status) {
        ToastMessage("success", result.data.message);
        const maydata = data.filter((item) => item.productId !== id);
        setData(maydata);
        setRefresh(!refresh);
        refreshCart();
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {}
  };

  return (
    <>


      {pending ? (
        <Loader />
      ) : (
        <div>
          {data.length ? (
            <div className="container">
<TopPageImage pagename="Cart"></TopPageImage>
              <div className="wrap-table-shopping-cart">
                {data.map((product, index) => {
                  return (
                    <div className="cart_container">
                      <div className="description_quantity">
                        <div className="cart_img_container">
                          <img
                            src={`${ImageUrl}${product.files}`}
                            alt="IMG"
                            onClick={() => gotodetails(product.productId)}
                          />
                        </div>

                        <div className="cart_wrap-num-product flex-w m-l-auto m-r-0">
                          <button
                            className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m cart_qantity_btn"
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              handleminus(product.id, product.quantity, index)
                            }
                          >
                            <i className="fs-16 zmdi zmdi-minus"></i>
                          </button>

                          <input
                            className="mtext-104 cl3 txt-center num-product cart_qantity_btn"
                            type="number"
                            name="num-product2"
                            value={product.quantity}
                          />

                          <button
                            className="btn-num-product-up cart_qantity_btn cl8 hov-btn3 trans-04 flex-c-m"
                            type="button"
                            disabled={loading}
                            onClick={() => handleplus(product.id, index)}
                          >
                            <i className="fs-16 zmdi zmdi-plus"></i>
                          </button>
                        </div>

                        <div className="remove_btn_container">
                          <button
                            className="icon-btn add-btn cart_delete_btn"
                            onClick={() => deletefromCartAlert(product.id)}
                          >
                            <DeleteIcon
                              sx={{ color: "red", fontSize: "24px" }}
                            />{" "}
                            REMOVE
                          </button>
                        </div>
                      </div>
                      <div className="remove_contain">
                        <div className="pro_description">
                          <h3 className="product_name_cart">
                            {product.product_name}
                          </h3>
                          <p className="header-cart-item-rupee">
                            <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                            {product.mrp_amount}/-
                          </p>
                          <p className="product_description_cart">
                            <RemoveTag ParserText={product.description} />
                          </p>
                          <p className="product_description_cart">
                            Size : {product.product_size}
                          </p>
                          <p className="product_description_cart">
                            {" "}
                            Color :{" "}
                            <CircleIcon sx={{ color: product.color_code }} />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

             </div>
          ) : (
            <Empty image={emptycartlist} btn="Shop Now" />
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
