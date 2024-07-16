import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { useFormik } from "formik";
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import "./index.css"
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../utils/ToastMessage';
import { LoginFormSchema } from '../../utils/validation';
import ButtonComponent from '../../components/LoginBtn/Button';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MuiPhoneNumber from 'mui-phone-number'; 
// import MuiPhoneNumber from '@mui/icons-material/PhoneNumber';

import { OtpverifyApi, loginApi, postApiCall, resendotpApi } from '../../API/baseUrl';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from 'bootstrap';

const initialValues = {
  mobile: "",
  dial_code: "",
  otp: "",

}

const Login = ({ handleafterloginaddtocart, wishlist,handlelike, setShowloginpopup, showloginpopup, reload, setReload, refresh, setRefresh, setMobilenumber, setCartTotal, setCartcount }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [useridval, setUseridval] = useState("")
  const [showotp, setShowotp] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState(120); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => { clearInterval(timer);};
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;


  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: LoginFormSchema,
      onSubmit: () => submitForm()
    });

  const handleprofilePageclose = () => {
    setShowloginpopup(false)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit2 = (e) => {
    e.preventDefault()
    handleSubmit()
    console.log("error", errors)
    console.log("values", values)
  }

  const handleNumberChange = async () => {
    const apiValue = {
      mobile: values.mobile.trim(),
      dial_code: values.dial_code,
    }
    try {
      const result = await postApiCall(`${resendotpApi}/${useridval}`, apiValue)
      if (result.data.status) {
        ToastMessage("success", result.data.message);
        setTimeLeft(120)
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  const phoneChange = (data, value) => {
    setFieldValue("mobile", data.replace("+", "", "-").replace(value.dialCode, "", "-"))
    setFieldValue("dial_code", value.dialCode)
  }

  // -------------------------------------------api call---------------------------------------------
  const submitForm = async () => {
    const apiValue = {
      mobile: values.mobile.trim(),
      dial_code: values.dial_code,
    }
    try {
      setLoading(true)
      const result = await postApiCall(loginApi, apiValue)

      if (result.data.status) {
        localStorage.setItem('userId', result.data.data.userId)
        setUseridval(result.data.data.userId)
        setLoading(false)
        setShowotp(true)
        setReload(!reload)

        ToastMessage("success", result.data.message);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.error(error)

    } finally {
      setLoading(false)
    }

  }



  const gototerms = () => {
    navigate("/terms")
    setShowloginpopup(false)
  }

  const OtpVerify = async () => {
    const otpValue = {
      mobile: values.mobile.trim(),
      dial_code: values.dial_code,
      otp: values.otp,
    }
    try {
      setLoading(true)
      const result = await postApiCall(OtpverifyApi, otpValue)

      if (result.data.status) {
        localStorage.setItem("user_id", (result.data.userId))
        localStorage.setItem("mobile", (result.data.mobile))
        localStorage.setItem("name", (result.data.name))
        localStorage.setItem("refresh_token", result.data.refresh_token)
        localStorage.setItem("access_token", result.data.token)
        setLoading(false)
        ToastMessage("success", result.data.message);
          setShowloginpopup(false)
          setReload(!reload)
          if (handleafterloginaddtocart) {
            handleafterloginaddtocart(result.data.userId)
          }
          else if(wishlist==='true'){
            handlelike()
          }
      } 
      else {
        ToastMessage("error", result.data.message);
        if(result.data.message ==="Maximum verification attempts reached. Please contact support."){
          setShowotp(false)
        }
      }
    } catch (error) {
      console.error(error)

    } finally {
      setLoading(false)
    }

  }
  // ----------------------------------------------api call-----------------------------------------------
  return (
  <div className="mt-5">
      <Modal
      open={showloginpopup}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{ fontFamily: "'Lato', sans-serif" }}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          justifyContent: 'center',
          minHeight: 450
        }}
      >
        <Box
          noValidate
          sx={{}}
          className='login_container_first'
        >
          <div>
            <h2 className='Login_heading'>Login</h2>
            <p className='Login_text'>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <div className='loginIcon_container'>
            <CardGiftcardIcon sx={{ fontSize: "150px" }} />
          </div>
        </Box>


        {showotp ?
          <Box
            noValidate
            sx={{}}
            className='login_container'
          >
            <CloseIcon sx={{ float: "right", cursor: "pointer" }} onClick={handleprofilePageclose} />

            <div className="otpverify_container">
              <FormControl variant="outlined"  sx={{ mt: 2 }}>
                <InputLabel htmlFor="password" required >Enter OTP</InputLabel>
                <OutlinedInput
                  name="otp"
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.otp}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Otp Verify"

                />
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </FormControl>

              <p className='otpverify'>Please enter the OTP sent to Your Number.
              
           </p>
            </div>
            <Grid sx={{ display: "flex", flexDirection:"column", justifyContent: "center", mt: 5 }}>

              <ButtonComponent btn_name="Verify" loading={loading} type="submit" onClick={OtpVerify} />
              <p className='otpverify_resend my-4 '
              style={{
                textAlign:"center"
              }}
              
               > {minutes === 0 && seconds === 0 ? "" : 
                <p className='otpverify_resend'>
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>
              }<button className='otpverify_resend' type='button' disabled={minutes !== 0 || seconds !== 0 } sx={{ cursor: "pointer", color: "#2a78ff" }} onClick={handleNumberChange}> Resend OTP</button></p>
            </Grid>
          </Box>
          :
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit2}
            sx={{}}
            className='login_container'
          >
            <CloseIcon sx={{ float: "right", cursor: "pointer" }} onClick={handleprofilePageclose} />


            <div className="marginBottom">
              <MuiPhoneNumber
                sx={{ '& svg': { height: '1em', }, }}
                className='mobile_phone_field'
                name='mobile'
                disableAreaCodes
                defaultCountry={'in'}
                label="Mobile Number"
                onChange={phoneChange}
              />
              {errors.mobile && touched.mobile ? (
                <p className="Login_form-error">{errors.mobile}</p>
              ) : null}

              <p className='loginprivacy'>By continuing, you agree to TreasureBox's <span onClick={gototerms}
              style={{
                color:"#bc8246"
              }}
              >Terms & conditions.</span></p>
            </div>
            <Grid sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <button  loading={loading} type="submit" className='loginbtn'>Request OTP</button>
            </Grid>
          </Box>
        }

      </Box>

    </Modal>
  </div>

  )
}

export default Login;


