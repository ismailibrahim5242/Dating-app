import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Admin.css";

const SignupForm = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name is required'),
    age: Yup.number()
      .min(0, 'Invalid age')
      .max(120, 'Invalid age')
      .required('Age is required'),
    dob: Yup.date()
      .required('Date of birth is required')
      .typeError('Invalid date'),
    sex: Yup.string()
      .oneOf(['Male', 'Female', 'Other'], 'Invalid option')
      .required('Sex is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Signup Form</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          age: '',
          dob: '',
          sex: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Data:', values);
          alert('Signup Successful!');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <Field type="number" id="age" name="age" />
              <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <Field type="date" id="dob" name="dob" />
              <ErrorMessage name="dob" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="sex">Sex:</label>
              <Field as="select" id="sex" name="sex">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="sex" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}  className='adminB'>
              Signup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
