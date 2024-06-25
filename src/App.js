
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Contact from './Pages/contact/index';
import ProductDetail from './Pages/productsDetail/index';
import About from './Pages/about/index';
import Main from './Pages/main/index';
import Help from './Pages/faq';
import CheckOut from './Pages/checkOut';
import Liked from './Pages/liked';
import SearchPage from './Pages/searchPage';
import SimpleDialog from './Pages/productsDetail/modal';
import Login from './Pages/login/login';
import { useState } from 'react';
import Order from './Pages/orders';
import OrderDetails from './Pages/orders/order';
import TermsAndConditions from './Pages/terms';
import Profile from './Pages/profile';
import { Button, Toast } from 'bootstrap';
// import { getNotificationToken, onMessageListener } from './firebase';
import OrderCheckout from './Pages/newcheckout';
import NewProductpage from './Pages/newproducts';
import Newcart from './Pages/newCart';
import Products from './Pages/products';
import Privacy from './Pages/Privacy';
import ReturnPolicy from './Pages/return/returnPolicy';
import Refund from './Pages/return/Refund';
import Shipping from './Pages/return/shipping';
import Paymentfail from './Pages/newcheckout/paymentfail';
import Paymentdone from './Pages/newcheckout/paymentdone';
import UseScrollToTop from './components/topOpen';
import { Shop, Try } from '@mui/icons-material';
import TryNav from './Componentsnew/com/trynav';
import Com from './Componentsnew/com';
import NotFound from './components/NotFound/NotFound';
// import Navbar2 from './components/header2';



function App() {

  const [reload, setReload] = useState(false)
  const [catval, setCatval] = useState("");

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  // getNotificationToken(setTokenFound);

  // onMessageListener().then(payload => {
  //   setShow(true);
  //   setNotification({title: payload.notification.title, body: payload.notification.body})
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main {...{ reload, setReload ,catval, setCatval}} />,
      children: [
        { element: <Navigate to="/"/>, index: true },
        { path: "product", element: <NewProductpage {...{reload, setReload ,catval, setCatval}}/> },
        { path: "product/:id/:name", element: <NewProductpage {...{reload, setReload ,catval, setCatval}}/> },
        { path: "product/:name/:id/:type", element: <NewProductpage {...{reload, setReload ,catval, setCatval}}/> },
        { path: "contact", element: <Contact/> },
        { path: "cart", element: <Newcart {...{reload, setReload}} /> },
        { path: "productDetails/:id/:name", element: <ProductDetail {...{reload, setReload ,catval, setCatval}} /> },
        { path: "about", element: <About /> },
        { path: "help", element: <Help /> },
        { path: "address", element: <CheckOut/> },
        { path: "checkout", element: <OrderCheckout {...{reload, setReload}} /> },
        { path: "liked", element: <Liked /> },
        { path: "login", element: <Login /> },
        { path: "order", element: <Order /> },
        { path: "orderdetails/:id", element: <OrderDetails /> },
        { path: "terms", element: <TermsAndConditions /> },
        { path: "privacy", element: <Privacy /> },
        { path: "profile", element: <Profile /> },
        { path: "return", element: <ReturnPolicy /> },
        { path: "refund", element: <Refund /> },
        { path: "shipping", element: <Shipping /> },
        { path: "payment-cancel", element: <Paymentfail /> },
        { path: "payment-callback", element: <Paymentdone /> },
        { path: "shop", element: <TryNav /> },
         { path:"", element:<NotFound></NotFound>}
     
      ]
    },
    {
      path: "searchpage",
      element: <SearchPage />,
      children: []
    },
    {
      path: "/modal",
      element: <SimpleDialog/>,
      children: []
    },

  ]);


  return (
    <>
      
   
      <RouterProvider router={router} >
        <UseScrollToTop />
        <div className="App">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>


    </div>
      </RouterProvider>
    </>
  );
}

export default App;
