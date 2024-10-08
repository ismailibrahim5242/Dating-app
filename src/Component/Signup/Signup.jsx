import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginbg from "../../assets/loginLogo.svg";
import background from "../../assets/Bg.jpeg";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});

const Signup = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center loginbg-overlay" style={{ position: 'relative' }}>
      <img src={background} alt="" className="bg"
       style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }} />

      <div className="signup-content">
        <div className="logo1 ">
          <img src={loginbg} alt="Logo" className="w-50 img-fluid mx-auto d-flex flex-column justify-content-center" />
        </div>

        <div className="signup-container">
          <h1 className="text-center text-light ">Sign Up</h1>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log('Form data', values);
              alert('Signup successful');
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="signup-form">
                <div className="form-group mb-3">
                  <label htmlFor="username" className="text-light">Username</label>
                  <Field
                    type="text"
                    name="username"
                    className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="username" className="invalid-feedback" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-light">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="email" className="invalid-feedback" />
                </div>

                {/* Password field */}
                <div className="form-group mb-3">
                  <label htmlFor="password" className="text-light">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="password" className="invalid-feedback" />
                </div>

                {/* Confirm Password field */}
                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="text-light">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="confirmPassword" className="invalid-feedback" />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
