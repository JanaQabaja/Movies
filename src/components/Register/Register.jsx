import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import * as Yup from 'yup';
import './Register.css'

export default function Register() {
  
let [error, setError]= useState([])
let navigate= useNavigate()
const schema=Yup.object({
     userName:Yup.string().required("name is required").min(3,"min is 3 characters").max(10,"max is 10 characters"),
     email:Yup.string().required("email is required").email("not valid email"),
     password:Yup.string().required("password is required"),
     cPassword:Yup.string().required("confirm password is required").oneOf([Yup.ref('password')],"not match password")
     
   })
 

    let register = async(values)=>{
      console.log('jana');
      let {data}=await axios.post('https://apiecommerce-hblh.onrender.com/auth/signup',values)
        if(data.message==="success"){
            console.log("registred");
            navigate('/login')
        }else{
            setError(data.err[0])

        }
     
    }
   


let {errors , values ,handleChange ,handleSubmit ,handleBlur , touched}  = useFormik({ 
  initialValues: {
    email:"",
    userName:"",
    password:"",
    cPassword:""
  },
  validationSchema: schema,
  onSubmit: register
})
  return (
<>
    <Header
    title="Create an acount"
    height="40"
    />
    <div className="container mt-5 pt-5">
    <form className='w-50 m-auto text-center mb-5 py-5 ' onSubmit={ handleSubmit}>
        {error.map((err)=>{
            return  <div className="alert alert-danger">{err.message}</div>
        })}

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  id="exampleInputEmail1" 
     value={values.email} onChange={ handleChange}  name='email' aria-describedby="emailHelp" onBlur={handleBlur}
     className={`form-control ${ errors.email && touched.email? "is-invalid":""}`}/>
     { errors.email && touched.email? <div className='small text-danger'>{ errors.email} </div>:<></>}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text"  id="exampleInputName"  value={values.userName} onChange={handleChange}  onBlur={handleBlur} name='userName' 
    className={`form-control ${errors.userName && touched.userName? "is-invalid":""}`} autoComplete="off"/>
    {errors.userName && touched.userName? <div className='small text-danger'>{errors.userName} </div>:<></>}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password"  id="exampleInputPassword1"  value={values.password} onChange={handleChange} onBlur={handleBlur} name='password'
    className={`form-control ${errors.password && touched.password? "is-invalid":""}`} autoComplete="new-password" />
    {errors.password && touched.password? <div className='small text-danger'>{errors.password} </div>:<></>}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
    <input type="password"  id="exampleInputPassword2"  value={values.cPassword} onChange={handleChange} onBlur={handleBlur} name='cPassword'
    className={`form-control ${errors.cPassword && touched.cPassword? "is-invalid":""}`}/>
    {errors.cPassword && touched.cPassword? <div className='small text-danger'>{errors.cPassword} </div>:<></>}
  </div>

  <button type="submit"  className="sub">Submit</button>
</form>
</div>
</>
  )
}

