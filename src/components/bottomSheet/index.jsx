import React from "react";
import ButtonForAll from "../ButtonForALL";
import { Divider } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import "./index.css";
const BottomSheetCom = ({
  GotoOrders,
  handleprofilePage,
  GotoProfile,
  username,
  user_id,
  mobile,
  handlelikePage,
  gotocontact,
  gotoabout,
  handlelogout,
  MobileProfilebtnOff,
}) => {
  return (
    <div>
      <div
        className="profile_container container_profile"
        style={{
          padding: "20px",
        }}
      >
        <RxCross2 onClick={MobileProfilebtnOff} className="CorssButton" />
        {/* Profile content */}
        {username ? (
          <h6 style={{ color: "#5d5555", fontWeight: 600 }}>
            Hello {username}
          </h6>
        ) : (
          <h6 style={{ color: "#5d5555", fontWeight: 600 }}>Welcome</h6>
        )}

        {user_id ? (
          <p>{mobile}</p>
        ) : (
          <p className="profile_welcome_msg">
            To access account and manage orders
          </p>
        )}

        {user_id ? (
          ""
        ) : (
          <ButtonForAll
            name="Login"
            className="login_btn_profile"
            onClick={handleprofilePage}
            style={{
              cursor: "pointer",
            }}
          ></ButtonForAll>
        )}
      </div>
      <Divider />

      <div
        className="profile_container"
        style={{
          padding: "20px",
          zIndex: "9999",
        }}
      >
        <p
          className="profile_list"
          onClick={user_id ? GotoProfile : handleprofilePage}
          style={{
            cursor: "pointer",
          }}
        >
          My Profile
        </p>
        <p
          className="profile_list"
          onClick={user_id ? GotoOrders : handleprofilePage}
          style={{
            cursor: "pointer",
          }}
        >
          Orders
        </p>
        <p
          className="profile_list"
          onClick={handlelikePage}
          style={{
            cursor: "pointer",
          }}
        >
          Wishlist
        </p>
        <p
          className="profile_list"
          onClick={gotocontact}
          style={{
            cursor: "pointer",
          }}
        >
          Contact Us
        </p>
        <p
          className="profile_list"
          onClick={gotoabout}
          style={{
            cursor: "pointer",
          }}
        >
          About Us
        </p>
        <button style={{ color: " #c1bcbc" }} className="custom-buttonlogout">
          Logout
          {user_id ? (
            <p className="innercontainerlogout" onClick={handlelogout}>
              Logout
            </p>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomSheetCom;
