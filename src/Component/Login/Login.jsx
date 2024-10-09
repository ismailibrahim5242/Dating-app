import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate for navigation
import loginbg from "../../assets/loginLogo.svg";
import background from "../../assets/Bg.jpeg";
import bcrypt from 'bcryptjs';  // Import bcrypt to compare hashed passwords

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();  // For programmatic navigation after login

  const handleLogin = (values, { setSubmitting }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists
    const user = users.find(user => user.email === values.email);

    if (user) {
      // Compare the entered password with the stored hashed password
      const passwordMatch = bcrypt.compareSync(values.password, user.password);

      if (passwordMatch) {
        alert('Login successful');
        navigate('/dashboard');  // Redirect to the dashboard or any protected route after login
      } else {
        alert('Invalid password');
      }
    } else {
      alert('No account found with this email');
    }

    setSubmitting(false);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center loginbg-overlay" style={{ position: 'relative' }}>
      <img src={background} alt="" className="bg" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }} />

      <div className="login-content">
        <div className="logo1">
          <img src={loginbg} alt="Logo" className="w-50 img-fluid mx-auto d-flex flex-column justify-content-center" />
        </div>

        <div className="login-container">
          <h1 className="text-center text-light">Login</h1>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-light">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="email" className="invalid-feedback" />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="password" className="text-light">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage component="div" name="password" className="invalid-feedback" />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                {/* Signup prompt */}
                <div className="text-center text-light mt-3">
                  Don't have an account? <Link to="/user/signup" className="text-primary">Sign Up</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
