import React, { useEffect } from 'react'
import "./index.css"
import { Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { getApiCall, getuserprofile, postApiCall, updateProfile } from '../../API/baseUrl';
import ToastMessage from '../../utils/ToastMessage';
import { ThreeDots } from 'react-loader-spinner';
import { profileSchema } from '../../utils/validation';

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


const Profile = () => {

    const user_id = localStorage.getItem("user_id")
    const mobile = localStorage.getItem("mobile")
    const [value, setValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [mobilevalue, setMobilevalue] = React.useState(mobile);


    const handleradioChange = (event) => {
        setValue(event.target.value);
    };

    const initialValues = {
        firstname: "",
        lastname: "",
        mobile: mobilevalue,
        email: "",
        dial_code: "",
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
              validationSchema: profileSchema,
            onSubmit: () => submitForm()
        });

    const handleSubmit2 = (e) => {
        e.preventDefault()
        handleSubmit()
        console.log("error", errors)
        console.log("values", values)
    }


    const submitForm = async () => {
        const apiValue = {
            mobile: values.mobile,
            dial_code: values.dial_code,
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
            gender: value,
        }
        setLoading(true)
        try {
            const result = await postApiCall(`${updateProfile}/${user_id}`, apiValue)
            if (result.data.status) {
                ToastMessage("success", result.data.message);
                localStorage.setItem("name",values.firstname)
                getProfile()
                setLoading(false)
            } else {
                ToastMessage("error", result.data.message);
            }
        } catch (error) {
            console.error(error)

        } finally {
            setLoading(false)
        }

    }


    const getProfile = async () => {
        try {
            const result = await getApiCall(`${getuserprofile}/${user_id}`)
            if (result?.data?.status) {
                const { dial_code, mobile, first_name, last_name, email, gender } = result?.data?.data || {}
                setValue(gender)
                setMobilevalue(mobile)
                values.firstname = first_name
                values.lastname = last_name
                values.email = email
                values.dial_code = dial_code

            } else {
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <div className='profile_page_container'>
            <Box component="form" className="form_container_box" onSubmit={handleSubmit2}>
                <Grid container spacing={1} sx={{ p: 3, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ alignItems: 'center', fontWeight: 'bold' }}>
                        <TextField
                        className='profile-textfield'
                         value={values.firstname} fullWidth name='firstname'
                            id="firstname" label="First Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.firstname && touched.firstname ? (
                            <p className="form-error">{errors.firstname}</p>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ alignItems: 'center', fontWeight: 'bold' }}>
                        <TextField className='profile-textfield' value={values.lastname} fullWidth name='lastname'
                            id="lastname" label="Last Name"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.lastname && touched.lastname ? (
                            <p className="form-error">{errors.lastname}</p>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ alignItems: 'center', fontWeight: 'bold' }}>
                        <TextField className='profile-textfield' value={values.email} fullWidth
                            name='email' id="email" label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                            <p className="form-error">{errors.email}</p>
                        ) : null}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ alignItems: 'center', fontWeight: 'bold' }}>
                        <TextField className='profile-textfield' disabled value={values.mobile}
                            focused fullWidth name='mobile' id="mobile"
                            label="Mobile" variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.mobile && touched.mobile ? (
                            <p className="form-error">{errors.mobile}</p>
                        ) : null}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
                        <FormLabel id="demo-radio-buttons-group-label"><p>Your Gender</p></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={value}
                            name="gender"
                            className='addresstype_radio'
                            value={value}
                            onChange={handleradioChange}
                        >
                            <FormControlLabel type="button" value="male" control={<Radio />} label={<p>Male</p>} />
                            <FormControlLabel  type="button" value="female" control={<Radio />} label={<p>Female</p>} />
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
                        <button type='submit' disabled={loading} className="profile_save_btn">{loading ? loader : "SAVE"}</button>
                        
                    </Grid>
                </Grid>

            </Box>
    
        </div>
    )
}

export default Profile;