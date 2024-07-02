import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormComponent = () => {
  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    counter: '',
    country: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().required('Mobile number is required'),
    country: Yup.string().when('mobile', {
      is: (val) => val && val.trim() !== '',
      then: Yup.string().required('Country is required when mobile number is provided'),
    }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form style={{ maxWidth: '400px', margin: 'auto' }}>
          <div>
            <label>Name:</label>
            <Field
              type="text"
              name="name"
              className={errors.name && touched.name ? 'error' : ''}
            />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label>Email:</label>
            <Field
              type="email"
              name="email"
              className={errors.email && touched.email ? 'error' : ''}
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label>Mobile:</label>
            <Field
              type="text"
              name="mobile"
              className={errors.mobile && touched.mobile ? 'error' : ''}
            />
            <ErrorMessage name="mobile" component="div" className="error" />
          </div>
          <div>
            <label>Country:</label>
            <Field
              as="select"
              name="country"
              className={errors.country && touched.country ? 'error' : ''}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </Field>

            <input type="date" />
            <ErrorMessage name="country" component="div" className="error" />
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
