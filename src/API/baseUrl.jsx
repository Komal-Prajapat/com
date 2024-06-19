import axios from 'axios';
import ToastMessage from '../utils/ToastMessage';
const user_id = localStorage.getItem("user_id")

export const baseUrl = axios.create({
    // baseURL: 'https://gallant-cohen.50-17-89-82.plesk.page/',
    baseURL: 'https://treasure.technotoil.com/',
    // baseURL: 'https://a61e-27-58-197-40.ngrok-free.app/',
});

export const ImageUrl = 'https://treasure.technotoil.com/'

// export const postApiCall = (apiPath, value) => {
//     const refresh_token = localStorage.getItem("refresh_token");
//     const access_token = localStorage.getItem("access_token");
//     const response = baseUrl.post(apiPath, value ,{

//     });

//     return response
// }

// const refresh_token = localStorage.getItem("refresh_token");
// const access_token = localStorage.getItem("access_token");
// const device_token = localStorage.getItem("device_token");

// const customHeaders = {
//     token: access_token,
//     refreshToken : refresh_token,
//     device_token : device_token,
// };

export const postApiCall = async (url, data) => {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    const device_token = localStorage.getItem("device_token");

    const customHeaders = {
        token: access_token,
        refreshToken: refresh_token,
        deviceToken: device_token,
    };

    let response
    try {
        response = await baseUrl.post(url, data, {
            headers: customHeaders,
        })
    } catch (error) {
        if (error.response.data.message === "Authorization token has expired") {
            const result = await baseUrl.post(refreshtokenapi, {
                refreshToken: refresh_token
            })

            localStorage.setItem("access_token", result.data.accessToken)
            const customHeaders = {
                token: result.data.accessToken,
                refreshToken: refresh_token
            };
            response = await baseUrl.post(url, data, {
                headers: customHeaders,
            })
        }
     if (error.response.data.message === "Invalid authorization token") {
        const result = await postApiCall(`${logoutApi}/${user_id}`)
        if (result?.data?.status) {
            ToastMessage("success", result.data.message);
            localStorage.removeItem("user_id");
            localStorage.removeItem("mobile");
            localStorage.removeItem("name");
        } 
        else {
            ToastMessage("error", result.data.message);
        }
        }
    }
    return response
}
export const deleteApiCall = async (url, data) => {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    const device_token = localStorage.getItem("device_token");
    
    const customHeaders = {
        token: access_token,
        refreshToken : refresh_token,
        deviceToken : device_token,
    };
    
    let response
    try {
        response = await baseUrl.delete(url, data, {
            headers: customHeaders,
        })
    } catch (error) {
        if (error.response.data.message === "Authorization token has expired") {
            const result = await baseUrl.post(refreshtokenapi, {
                refreshToken: refresh_token
            })
            localStorage.setItem("access_token", result.data.accessToken)
            const customHeaders = {
                token: result.data.access_token,
                refreshToken: refresh_token
            };
            response = await baseUrl.post(url, data, {
                headers: customHeaders,
            })
        }
     if (error.response.data.message === "Invalid authorization token") {
            const result = await postApiCall(`${logoutApi}/${user_id}`)
            if (result?.data?.status) {
                ToastMessage("success", result.data.message);
                localStorage.removeItem("user_id");
                localStorage.removeItem("mobile");
                localStorage.removeItem("name");
            } 
            else {
                ToastMessage("error", result.data.message);
            }
            }
    }
    return response
}


export const loginApi = "user/user-signIn";

export const resendotpApi = "user/resend-otp";

export const categoryfilterApi = "category/list-by-category";

export const subcategoryfilterApi = "category/listBy-sub-category";



export const filterApi = "product/get-filtered-record";

export const mobilefilterApi = "product/get-mobile-filter-product";

export const searchhomeapi = "product/home-search-list";

export const checkoutApi = "user/save-userAddress";

export const logoutApi = "user/user-logout";

export const addtocartApi = "product/add-product-to-cart";

export const addtowishlist = "product/addProductWishlist";

export const deleteFromcartApi = "product/deleteFromcart";

export const deleteFromWishlistApi = "product/deleteFromWishlist";

export const contactApi = "user/user-question";

export const OtpverifyApi = "user/otp-verify";

export const getProductApi = "product/cartProduct-ById"

export const quantitydecApi = "product/delete-quantity-cartProduct"

export const quantityincApi = "product/update-quantity-cartProduct"

export const getuseraddressApi = "user/get-userAddress"

export const updateuseraddressApi = "user/save-userAddress"

export const placeorderApi = "product/add-Order-product"

export const updateuseradressbyid = "user/updateAddress"

export const newarrival = "product/get-new-arrivalProduct"

export const updateProfile = "user/update/user/profile"

export const refreshtokenapi = "user/update-accessToken-fromRefresh-token"







export const getApiCall = async (url, data) => {
    const refresh_token = localStorage.getItem("refresh_token");
const access_token = localStorage.getItem("access_token");
const device_token = localStorage.getItem("device_token");

const customHeaders = {
    token: access_token,
    refreshToken : refresh_token,
    deviceToken : device_token,
};

    console.log("Refresh token", url, data)
    let response
    try {
        response = await baseUrl.get(`${url}`, {
            headers: customHeaders,
        })
    } catch (error) {
        if (error.response.data.message === "Authorization token has expired") {
            const result = await baseUrl.post(refreshtokenapi, {
                refreshToken: refresh_token
            })

            localStorage.setItem("access_token", result.data.accessToken)
            const customHeaders = {
                token: access_token,
                refreshToken: refresh_token
            };
            response = await baseUrl.get(url, data, {
                headers: customHeaders,
            })
        }
     if (error.response.data.message === "Invalid authorization token") {
            const result = await postApiCall(`${logoutApi}/${user_id}`)
            if (result?.data?.status) {
                ToastMessage("success", result.data.message);
                localStorage.removeItem("user_id");
                localStorage.removeItem("mobile");
                localStorage.removeItem("name");
            } 
            else {
                ToastMessage("error", result.data.message);
            }
            }
     if (error.response.data.message === "Authorization token is missing") {
            const result = await postApiCall(`${logoutApi}/${user_id}`)
            if (result?.data?.status) {
                ToastMessage("success", result.data.message);
                localStorage.removeItem("user_id");
                localStorage.removeItem("mobile");
                localStorage.removeItem("name");
            } 
            else {
                ToastMessage("error", result.data.message);
            }
            }
    }
    return response
}




export const ActivespecialProducts = "title/allYouNeedProduct";


export const carttotal = "product/cart-count";

export const getdeliverycharge = "delivery-charge/get-delivery-charges";

export const getfeaturedlist = "product/get-allFeatured-product";

export const getTitle = "title/get-all-title";

export const getlastaddress = "product/get-order-address";

export const getTermsandCondition = "term-condition/getData/"

export const orderDetails = "product/get/product/order/detail";

export const orderhistoryList = "product/get-order-history";

export const BannerList = "product/banner-activelist";

export const categoryList = "category/category-list"

export const ActiveProducts = "product/activeProductList";

export const Activecategory = "category/category-active-list";

export const Activesubcategory = "category/get-sub-category";

export const getlikedProductApi = "product/wishlistProductList"

export const getcartApi = "product/cart-Product-List"

export const getuserloginApi = "user/get-user"

export const getaddressbyid = "user/getAddressbyId"

export const getuserprofile = "user/get-user"

export const productCartCount = "product/cart-items-count"

export const gethometitleApi = "title/get-allTitle-images"


export const paymentApi = "product/razorpay/payment"










