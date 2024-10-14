import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import loginbg from "../../assets/loginLogo.svg";
import background from "../../assets/Bg.jpeg";
import bcrypt from 'bcryptjs';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required'),
});

const Signup = () => {
  const navigate = useNavigate(); 

  const handleSignup = (values, { setSubmitting }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const hashedPassword = bcrypt.hashSync(values.password, 10);

    const newUser = {
      username: values.username,
      email: values.email,
      password: hashedPassword,
      gender: values.gender,
      dob: values.dob,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

   
    alert('Signup successful');
    navigate('/user/login');  

    setSubmitting(false);
  };

  return (
    <div className="vh-10 d-flex justify-content-center align-items-center loginbg-overlay" style={{ position: 'relative' }}>
      <img src={background} alt="" className="bg" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }} />

      <div className="signup-content">
        <div className="logo1">
          <img src={loginbg} alt="Logo" className="w-50 img-fluid mx-auto d-flex flex-column justify-content-center" />
        </div>

        <div className="signup-container">
          <h1 className="text-center text-light">Sign Up</h1>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              gender: '',
              dob: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
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

               

                <div className="form-group mb-3">
                  <label htmlFor="gender" className="text-light">Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className={`form-control ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage component="div" name="gender" className="invalid-feedback" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="dob" className="text-light">Date of Birth</label>
                  <Field
                    type="date"
                    name="dob"
                    className={`form-control ${touched.dob && errors.dob ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="dob" className="invalid-feedback" />
                </div>


                <div className="form-group mb-3">
                  <label htmlFor="password" className="text-light">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="password" className="invalid-feedback" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword" className="text-light">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="confirmPassword" className="invalid-feedback" />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>

                
                <div className="text-center text-light mt-3">
                  Already have an account? <Link to="/user/login" className="text-primary">Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
