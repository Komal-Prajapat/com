import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = (type, message, zIndex = 9999) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    zIndex: 99999, 
  };

  if (type === "success") {
    toast.success(message, toastOptions);
  } else {
    toast.error(message, toastOptions);
  }
};

export default ToastMessage;
