import React, { useEffect } from "react";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import {
  getApiCall,
  getuserprofile,
  postApiCall,
  updateProfile,
} from "../../API/baseUrl";
import ToastMessage from "../../utils/ToastMessage";
import { ThreeDots } from "react-loader-spinner";
import { profileSchema } from "../../utils/validation";
import ButtonForAll from "../../components/ButtonForALL";
import "./index.css"; // Import your custom CSS file for styles

const Profile = () => {
  const user_id = localStorage.getItem("user_id");
  const mobile = localStorage.getItem("mobile");
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
  };

  // Define submitForm function
  const submitForm = async () => {
    const apiValue = {
      mobile: values.mobile,
      dial_code: values.dial_code,
      first_name: values.firstname,
      last_name: values.lastname,
      email: values.email,
      gender: value,
    };
    setLoading(true);
    try {
      const result = await postApiCall(`${updateProfile}/${user_id}`, apiValue);
      if (result.data.status) {
        ToastMessage("success", result.data.message);
        localStorage.setItem("name", values.firstname);
        getProfile();
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useFormik hook
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: profileSchema,
      onSubmit: submitForm, // Reference submitForm here
    });

  const getProfile = async () => {
    try {
      const result = await getApiCall(`${getuserprofile}/${user_id}`);
      if (result?.data?.status) {
        const { dial_code, mobile, first_name, last_name, email, gender } =
          result?.data?.data || {};
        setValue(gender);
        setMobilevalue(mobile);
        handleChange({ target: { name: "firstname", value: first_name } });
        handleChange({ target: { name: "lastname", value: last_name } });
        handleChange({ target: { name: "email", value: email } });
        handleChange({ target: { name: "dial_code", value: dial_code } });
      } else {
        // Handle error state or no data scenario
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile-page-container">
      <div className="background-image"></div>
      <Box
        component="form"
        className="form-container-box"
        onSubmit={handleSubmit}
      >
        <Grid
          container
          spacing={1}
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ alignItems: "center", fontWeight: "bold" }}
          >
            <TextField
              className="profile-textfield"
              value={values.firstname}
              fullWidth
              name="firstname"
              id="firstname"
              label="First Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstname && touched.firstname && (
              <p className="form-error">{errors.firstname}</p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ alignItems: "center", fontWeight: "bold" }}
          >
            <TextField
              className="profile-textfield"
              value={values.lastname}
              fullWidth
              name="lastname"
              id="lastname"
              label="Last Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastname && touched.lastname && (
              <p className="form-error">{errors.lastname}</p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ alignItems: "center", fontWeight: "bold" }}
          >
            <TextField
              className="profile-textfield"
              value={values.email}
              fullWidth
              name="email"
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ alignItems: "center", fontWeight: "bold" }}
          >
            <TextField
              className="profile-textfield"
              disabled
              value={values.mobile}
              focused
              fullWidth
              name="mobile"
              id="mobile"
              label="Mobile"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.mobile && touched.mobile && (
              <p className="form-error">{errors.mobile}</p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="radio-container"
          >
            <FormLabel id="demo-radio-buttons-group-label">
              <p>Your Gender</p>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={value}
              name="gender"
              className="addresstype_radio d-flex"
              value={value}
              onChange={handleradioChange}
            >
              <FormControlLabel
                value="male"
                control={<Radio sx={{ color: " var(--primary-color)" }} />} // Custom color for the radio button
                label={
                  <p
                    style={{
                      marginBottom: "0px",
                    }}
                  >
                    Male
                  </p>
                }
              />
              <FormControlLabel
                value="female"
                control={<Radio sx={{ color: " var(--primary-color)" }} />} // Custom color for the radio button
                label={
                  <p
                    style={{
                      marginBottom: "0px",
                    }}
                  >
                    Female
                  </p>
                }
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} sx={{}}>
            <ButtonForAll
              name={loading ? "Loading" : "Save"}
              type="submit"
              disabled={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Profile;
