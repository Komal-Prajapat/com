import { Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField} from '@mui/material';
import React, { useState } from 'react'
import "./index.css"
import ToastMessage from '../../utils/ToastMessage';
import { checkoutApi, postApiCall } from '../../API/baseUrl';
import { useFormik } from 'formik';

const initialValues = {
  name: "",
  mobile: "",
  pinCode: "",
  locality: "",
  city: "",
  state: "",
  landmark: "",
  alternateMobile: "",
  addressType: "",
}

const CheckOut = ({activeStep ,onBackClick ,onClick}) => {
  const user_id = localStorage.getItem("user_id")
  const [loading, setLoading] = useState(false)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: "",
      onSubmit: () => submitForm()
    });

  const handleSubmit2 = (e) => {
    e.preventDefault()
    handleSubmit()
    console.log("error", errors)
    console.log("values", values)
  }

  const submitForm = async () => {
    const apivalue = {
      userId: user_id,
      name: values.name,
      mobile: values.mobile,
      pinCode: values.pinCode,
      locality: values.locality,
      city: values.city,
      state: values.state,
      landmark: values.landmark,
      alternateMobile: values.alternateMobile,
      addressType: values.addressType,
    }
    try {
      setLoading(true)
      const result = await postApiCall(checkoutApi, apivalue)
      if (result.data.status) {
        localStorage.setItem("user_id", (result.data.userId))
        setLoading(false)
        ToastMessage("success", result.data.message);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      ToastMessage("error", error.message);

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={{ p: "20px" }} component="form"
        noValidate
        onSubmit={handleSubmit2}>
        <Grid container spacing={4} sx={{ display: 'flex', p: 3 }}>

          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="Name" variant="outlined" name="name" fullWidth value={values.name}
            onChange={handleChange} onBlur={handleBlur}
            />{errors.name && touched.name ? (
              <p className="form-error">{errors.name}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="Mobile Number" variant="outlined" name="mobile" value={values.mobile}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.mobile && touched.mobile ? (
              <p className="form-error">{errors.mobile}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="Pincode" variant="outlined" name="pinCode" value={values.pinCode}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.pinCode && touched.pinCode ? (
              <p className="form-error">{errors.pinCode}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="Locality" variant="outlined" name="locality" value={values.locality}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.locality && touched.locality ? (
              <p className="form-error">{errors.locality}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="City" variant="outlined" name="city" value={values.city}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.city && touched.city ? (
              <p className="form-error">{errors.city}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="State" variant="outlined" name="state" value={values.state}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.state && touched.state ? (
              <p className="form-error">{errors.state}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="Landmark" variant="outlined" name="landmark" value={values.landmark}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.landmark && touched.landmark ? (
              <p className="form-error">{errors.landmark}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ marginTop: "5px" }}>
            <TextField id="outlined-basic" label="Alternate Number" variant="outlined" name="alternateMobile" value={values.alternateMobile}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.alternateMobile && touched.alternateMobile ? (
              <p className="form-error">{errors.alternateMobile}</p>
            ) : null}
          </Grid>
          

          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: "5px" }}>
          <FormLabel id="demo-radio-buttons-group-label">Address Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="home"
            name="addressType"
          >
            <FormControlLabel value="home" control={<Radio />} label="Home (All day delivery)" />
            <FormControlLabel value="work" control={<Radio />} label="Work (Delivery between 10AM to 5PM)" />
          </RadioGroup>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <button
              disabled={activeStep === 0}
              onClick={onBackClick}
              sx={{ mr: 1 ,}}
              className='btn_checkout'
            >
              Back
            </button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            <button className='btn_checkout'>
            Next
          </button>
          </Box>

      </Box>
    </>
  )
}

export default CheckOut;