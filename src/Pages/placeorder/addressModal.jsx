
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import "react-image-gallery/styles/css/image-gallery.css";
import { Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import ToastMessage from '../../utils/ToastMessage';
import { checkoutApi, postApiCall } from '../../API/baseUrl';
import { useFormik } from 'formik';
import { addressformschema } from '../../utils/validation';
import { ThreeDots } from 'react-loader-spinner';

const initialValues = {
  name: "",
  mobile: "",
  pinCode: "",
  locality: "",
  city: "",
  state: "",
  landmark: "",
  alternateMobile: "",
}


const loader = <>
  Loading
  <ThreeDots
    height="20"
    width="20"
    radius="9"
    color="var(--white)"
    wrapperStyle={{}}
    ariaLabel="three-dots-loading"
    wrapperClassName=""
    visible={true}
  />
</>


function AddressDialog({onClick, showmodal,getuseraddress,setShowmodal}) {
    const user_id = localStorage.getItem("user_id")
    const [loading, setLoading] = React.useState(false)
    const [value, setValue] = React.useState("1");

  const handleradioChange = (event) => {
    setValue(event.target.value);
  };
  
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
      useFormik({
        initialValues,
        validationSchema: addressformschema,
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
        addressType: value,
      }
      try {
        setLoading(true)
        const result = await postApiCall(checkoutApi, apivalue)
        if (result.data.status) {
          setLoading(false)
          onClick()
          getuseraddress()
          ToastMessage("success", result.data.message);
          setValue("")
          values.name = "" 
          values.mobile = ""
          values.pinCode = ""
          values.locality = ""
          values.city = ""
          values.state = ""
          values.landmark = ""
          values.alternateMobile = ""
        } else {
          ToastMessage("error", result.data.message);
        }
      } catch (error) {
        console.log("error", error)
        ToastMessage("error", error.message);
  
      } finally {
        setLoading(false)
      }
    }

    const handleclose = () => {
      setShowmodal(!showmodal)
      setValue("")
      values.name = "" 
      values.mobile = ""
      values.pinCode = ""
      values.locality = ""
      values.city = ""
      values.state = ""
      values.landmark = ""
      values.alternateMobile = ""
    }
  

	return (
		<Dialog className='modal_dialog'
			 open={showmodal}
		>
		<Box className='addaddress_container overflow' component="form"
        noValidate
        onSubmit={handleSubmit2}>
            <CloseIcon onClick={handleclose} sx={{fontSize:"30px" , cursor:"pointer"}}/>
        <Grid container spacing={2} sx={{ display: 'flex', p: 3 }} className='overflow'>

          <Grid item xs={12} sm={12} md={6} lg={6} sx={{  }}>
            <TextField size="small" id="outlined-basic" label="Name" variant="outlined" name="name" fullWidth value={values.name}
            onChange={handleChange} onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <p className="address-form-error">{errors.name}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ }}>
            <TextField size="small" id="outlined-basic" label="Mobile Number" type='number' variant="outlined" name="mobile" value={values.mobile}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.mobile && touched.mobile ? (
              <p className="address-form-error">{errors.mobile}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ }}>
            <TextField size="small" id="outlined-basic" label="Pincode" type='number' variant="outlined" name="pinCode" value={values.pinCode}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.pinCode && touched.pinCode ? (
              <p className="address-form-error">{errors.pinCode}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ }}>
            <TextField size="small" id="outlined-basic" label="Locality" variant="outlined" name="locality" value={values.locality}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.locality && touched.locality ? (
              <p className="address-form-error">{errors.locality}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ }}>
            <TextField size="small" id="outlined-basic" label="City" variant="outlined" name="city" value={values.city}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.city && touched.city ? (
              <p className="address-form-error">{errors.city}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{  }}>
            <TextField size="small" id="outlined-basic" label="State" variant="outlined" name="state" value={values.state}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.state && touched.state ? (
              <p className="address-form-error">{errors.state}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{}}>
            <TextField size="small" id="outlined-basic" label="Landmark" variant="outlined" name="landmark" value={values.landmark}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.landmark && touched.landmark ? (
              <p className="address-form-error">{errors.landmark}</p>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ }}>
            <TextField size="small" id="outlined-basic" label="Alternate Number" type='number' variant="outlined" name="alternateMobile" value={values.alternateMobile}
            onChange={handleChange} onBlur={handleBlur} fullWidth
            />{errors.alternateMobile && touched.alternateMobile ? (
              <p className="address-form-error">{errors.alternateMobile}</p>
            ) : null}
          </Grid>
          

          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ }}>
          <FormLabel id="demo-radio-buttons-group-label">Address Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="1"
            name="addressType"
            className='addresstype_radio'
            value={value}
            onChange={handleradioChange}
          >
             <FormControlLabel value="1" control={<Radio />} label={<p>Home (All day delivery)</p>} />
              <FormControlLabel value="0" control={<Radio />} label={<p>Work (Delivery between 10AM to 5PM)</p>} />
          </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{display:"flex", justifyContent:"flex-end"}}>
            <button disabled={loading} className='address_update_btn' type='submit'>{loading ? loader : "SUBMIT"}
               </button>
             </Grid>
        </Grid>
      </Box>
		</Dialog>
	);
}
export default AddressDialog;