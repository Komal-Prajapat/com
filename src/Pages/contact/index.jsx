import React, { useState } from "react";
import "./index.css";
import { useFormik } from "formik";
import { contactApi, postApiCall } from "../../API/baseUrl";
import ToastMessage from "../../utils/ToastMessage";
import { contactSchema } from "../../utils/validation";
import ButtonForAll from "../../components/ButtonForALL";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import TopPageImage from "../../components/toppageimage";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
const initialValues = {
  email: "",
  mobile: "",
  message: "",
};

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    const apiValue = {
      email: values.email,
      message: values.message,
      mobile: values.mobile,
    };
    try {
      setLoading(true);
      const result = await postApiCall(contactApi, apiValue);
      if (result.data.status) {
        setLoading(false);
        ToastMessage("success", result.data.message);
      } else {
        ToastMessage("error", result.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: contactSchema,
      onSubmit: submitForm,
    });

  const handleSubmit2 = (e) => {
    e.preventDefault();
    handleSubmit(e);
    console.log("error", errors);
    console.log("values", values);
  };

  return (
    <>
      <TopPageImage pagename="Contact Us" bgimg="https://ng-outstock.vercel.app/assets/img/page-title/page-title-2.jpg"></TopPageImage>
      <section className="bg0 p-b-50 m-t-50">
        <div className="contactcontainer">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <h3 style={{color:'black'}}>Find us here.</h3>
              <div className="containtlist" style={{marginTop:'50px'}}>
                <div className="contacticon" >
                  <CiLocationOn  className="iconsContactPage"/>
                </div>
                
                <div className="data" >
                  <li>Address:</li>
                  <li  className="contctinformation" style={{width:'300px',height:'cover'}}>
                    12, Manik Bagh Rd, Nai 
                    Duniya, Triveni Colony, Indore,
                    Madhya Pradesh 452007
                  </li>
                </div>
              </div>

              <div className="containtlist">
                <div className="contacticon">
                  <HiOutlineMailOpen className="iconsContactPage" />
                </div>
                <div className="data">
                  <li>Email:</li>
                  <li className="contctinformation">treasurebox@gmail.com</li>
                </div>
              </div>

              <div className="containtlist">
                <div className="contacticon">
                  <FaPhoneAlt  className="iconsContactPage"/>
                </div>
                <div className="data">
                  <li>Phone Number:</li>
                  <li className="contctinformation">(+91)92945 88000</li>
                </div>
              </div>

<p className=" contactp" style={{marginTop:'30px'}}>Outstock is a premium Templates theme with advanced admin module. It’s extremely customizable, easy to use and fully responsive and retina ready. Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>

              <div className="icon">
            <a
              href="https://www.instagram.com/treasureboxlife/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="footerSocialMediaIcon" />
            </a>
            <a
              href="https://www.facebook.com/treasureboxlife/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="footerSocialMediaIcon" />
            </a>
            <a href="https://www.google.com/maps/dir/22.710376,75.8417746/treasurebox/@22.7060118,75.8356895,15z">
              <CiLocationOn className="footerSocialMediaIcon" />
            </a>
          </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <form onSubmit={handleSubmit2}>
                <h3 className="mtext-105 cl2 p-b-30">Contact Us.</h3>

                <div className="inputbox">
                  <label htmlFor="email">
                    Email <FaStar className="fromstaricon" />
                  </label>
                  <div className="bor8 how-pos4-parent icon-field m-b-2">
                    <input
                      id="email"
                      className="stext-111 cl2 plh3 size-116 p-3 "
                      type="text"
                      name="email"
                      placeholder="Your Email Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="form-error">{errors.email}</p>
                  )}
                </div>

                <div className="inputbox">
                  <label htmlFor="mobile">
                    Phone Number <FaStar className="fromstaricon" />
                  </label>
                  <div className="bor8 how-pos4-parent icon-field m-b-2">
                    <input
                      id="mobile"
                      className="stext-111 cl2 plh3 size-116 p-3 "
                      type="number"
                      name="mobile"
                      placeholder="Your Mobile Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                    />
                  </div>
                  {errors.mobile && touched.mobile && (
                    <p className="form-error">{errors.mobile}</p>
                  )}
                </div>

                <div className="inputbox">
                  <label htmlFor="message">
                    Message <FaStar className="fromstaricon" />
                  </label>
                  <div className="bor8">
                    <textarea
                      id="message"
                      className="stext-111 cl2 plh3 size-120 p-3"
                      name="message"
                      placeholder="How Can We Help?"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                    />
                  </div>
                  {errors.message && touched.message && (
                    <p className="form-error">{errors.message}</p>
                  )}
                </div>

                {/* <ButtonForAll /> */}

                <button
                  className="submitbtn"
                  name="Submit"
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  btn_name="Submit"
                >
                  send message
                </button>
                
              </form>

            </div>
          </div>
        </div>
      </section>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14716.453281537717!2d75.88825034999999!3d22.761175450000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1718699644594!5m2!1sen!2sin" style={{width:'100% ' ,height:'300px'}}></iframe>
    </>
  );
};

export default Contact;
