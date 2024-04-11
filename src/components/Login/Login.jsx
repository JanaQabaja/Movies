
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx';

import * as Yup from 'yup';

export default function Login({ getUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const schema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('https://apiecommerce-hblh.onrender.com/auth/signin', values);
      if (data.message === 'success') {
        localStorage.setItem('token', data.token);
        getUser();
        navigate('/movie');
      } else {
        setError(data.err[0]);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Header title="Login to See Our Movies" height="40" />
      <div className="container mt-5 pt-5">
        <form className="w-50 m-auto text-center mb-5 py-5" onSubmit={formik.handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="exampleInputEmail1"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.errors.email && formik.touched.email ? 'is-invalid' : ''
              }`}
              autoComplete="off"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="small text-danger">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="exampleInputPassword1"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${
                formik.errors.password && formik.touched.password ? 'is-invalid' : ''
              }`}
              autoComplete="new-password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="small text-danger">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="sub" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
}













// import axios from 'axios'
// import { useFormik } from 'formik'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Header from '../Header/Header.jsx'

// import * as Yup from 'yup'

// export default function Login({getUser}) {
//   let navigate= useNavigate()
// let [error, setError]= useState([])

//     const schema = Yup.object({
//         email:Yup.string().required("email is required").email('not valid email'),
//         password:Yup.string().required("password is required"),
//         })

    
//     let register = async (values) => {
//       console.log('jana');
//       try {
//           let { data } = await axios.post('https://apiecommerce-hblh.onrender.com/auth/signin', values)
//           console.log(data); // Log the response data
//           if (data.message === "success") {
//               console.log("login");
//               localStorage.setItem('token', data.token);
//               getUser();
//               navigate('/movie');
//           } else {
//               setError(data.err[0]);
//           }
//       } catch (error) {
//           console.error('Error:', error);
//       }
//   }
//     let {errors , values ,handleChange ,handleSubmit ,handleBlur , touched} = useFormik({ 
//     initialValues: {
//     email:"",
//     password:""
//     },
//     validationSchema:schema,
//     onSubmit:register
//     })

//   return (
//     <>
//     <Header
//     title="Login to See Our Movies"
//     height="40"
//     />
//     <div className="container mt-5 pt-5">
//     <form className='w-50 m-auto text-center mb-5 py-5' onSubmit={handleSubmit}>
//         {error.map((err)=>{
//             return  <div className="alert alert-danger">{err.message}</div>
//         })}
//   <div className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//     <input type="email"  id="exampleInputEmail1" 
//      value={values.email} onChange={handleChange}  name='email' aria-describedby="emailHelp" onBlur={handleBlur}
//      className={`form-control ${errors.email && touched.email? "is-invalid":""}`}/>
//      {errors.email && touched.email? <div className='small text-danger'>{errors.email} </div>:<></>}
//   </div>
  
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//     <input type="password"  id="exampleInputPassword1"  value={values.password} onChange={handleChange} onBlur={handleBlur} name='password'
//     className={`form-control ${errors.password && touched.password? "is-invalid":""}`} />
//     {errors.password && touched.password? <div className='small text-danger'>{errors.password} </div>:<></>}
//   </div>
  

//   <button type="submit" className="sub">Login</button>
// </form>
// </div>
// </>
//   )
// }