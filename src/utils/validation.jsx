import * as Yup from 'yup';
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const pincodeRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?$/;


export const LoginFormSchema = Yup.object().shape({
    mobile: Yup.string()
        .required("Mobile Number field is required")
        .min(10, "Mobile Number must contain 10 digits")
        // .max(10, "too long"),
});

export const contactSchema = Yup.object().shape({
    email: Yup.string().email().required('This field is required'),
    message: Yup.string().required("This field is required"),
    mobile: Yup.string()
        .required("Mobile Number field is required")
        .min(10, "Mobile Number must contain 10 digits")
        // .max(10, "too long"),
});

export const profileSchema = Yup.object().shape({
    firstname: Yup.string().matches(/^[a-zA-Z][a-zA-Z ]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/, "This field must contains alphabet").required('This field is required'),
    lastname: Yup.string().matches(/^[a-zA-Z][a-zA-Z ]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/, "This field must contains alphabet").required('This field is required'),
    email: Yup.string().email().required('This field is required'),
});

export const addressformschema = Yup.object().shape({
    firstname: Yup.string().matches(/^[a-zA-Z][a-zA-Z ]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/, "This field must contains alphabet").required('This field is required'),
    lastname: Yup.string().matches(/^[a-zA-Z][a-zA-Z ]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/, "This field must contains alphabet").required('This field is required'),
    mobile:Yup.string().matches(phoneRegex, "Invalid mobile.").min(10, "Mobile Number must contain 10 digits").max(10, "too long").required("This field is required"),
    pincode: Yup.string().matches(pincodeRegex, "Invalid pincode.").min(6, "Pincode must contain 6 digits").max(6, "too long").required("This field is required").typeError("only numbers are accepted"),
    address: Yup.string().required("This field is required").typeError("Invalid"),
    city: Yup.string().matches(/^[a-zA-Z][a-zA-Z ]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/, "This field must contains alphabet").required("This field is required"),
    state: Yup.string().matches(/^[a-zA-Z][a-zA-Z ]*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]*$/, "This field must contains alphabet").required("This field is required"),
    email:  Yup.string().email().required('This field is required'),
    // landmark: Yup.string().matches(/^[A-Za-z][A-Za-z0-9\s,.-]+$/,"Invalid").typeError("Invalid"),
    // alternateMobile: Yup.string().matches(phoneRegex, "Invalid mobile.").min(10, "Mobile Number must contain 10 digits").max(10, "too long"),
});