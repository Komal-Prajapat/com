import * as React from "react";
import Dialog from "@mui/material/Dialog";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, Card, Grid } from "@mui/material";
import "./index.css";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate } from "react-router-dom";

function GotocartDialog({ gotocartDialog, setGotocartDialog }) {
  const navigate = useNavigate();

  const gotocart = () => {
    setGotocartDialog(false);
    navigate("/cart");
  };

  return (
    <>
      <div className="emptyorder_container">
        <Card className="empty_card_placeorder">
          <div className="order_login_contain">
            <div className="step_contain">
              <p>1</p>
            </div>
            <div className="login_number_container">
              <h4>
                LOGIN <CheckIcon sx={{ color: "#1c13e7" }} />
              </h4>
            </div>
          </div>
        </Card>

        <Card className="empty_card_placeorder">
          <div className="order_login_contain">
            <p>2</p>
            <div className="login_number_container">
              <h4>
                DELIVERY ADDRESS <CheckIcon sx={{ color: "#1c13e7" }} />
              </h4>
            </div>
          </div>
        </Card>

        <Card className="empty_card_placeorder">
          <div className="order_login_contain">
            <p>3</p>
            <div className="login_number_container">
              <h4>ORDER SUMMARY</h4>
            </div>
          </div>
        </Card>

        <Card className="empty_card_placeorder">
          <div className="order_login_contain">
            <p>4</p>
            <div className="login_number_container">
              <h4>PAYMENT OPTION</h4>
            </div>
          </div>
        </Card>
      </div>

      <div className="empty_checkout_container">
        <Dialog className="modal_dialog" open={gotocartDialog}>
          <Box sx={{ p: "50px", backgroundColor: "#ffffff" }}>
            <div className="empty_checkout_dialog">
              <ErrorIcon
                sx={{ color: "var(--primary-color)", fontSize: "62px" }}
              />
              <h5>Your checkout has no items.</h5>
              <button
                type="button"
                onClick={gotocart}
                className="login_continue_btn"
              >
                Go To Cart
              </button>
            </div>
          </Box>
        </Dialog>
      </div>
    </>
  );
}
export default GotocartDialog;
