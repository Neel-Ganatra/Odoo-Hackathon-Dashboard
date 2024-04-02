import React from 'react'
import { useState } from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';


const Login = () => {
const [values, setValues] = useState({
    enroll: '',
    password: ''
})
const [error, setError] = useState(null)
const navigate = useNavigate()
// axios.defaults.withCredentials = true;
const handleSubmit = (event) => {
    event.preventDefault()
  
    axios.post("http://localhost:3000/auth/adminLogin", values)
    .then(result => {
        // console.log(result)
        if(result.data.loginStatus)
        {
        
            navigate('/Dashboard')
        }
        else
        {
            setError(result.data.Error)
        }
        
    })
    .catch(err => console.log(err))
}
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
           <div className='text-danger'>{error && error}</div>
           
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="enroll">Enrollment Number</label>
                    <input type="Text" id="enroll" placeholder='Enter Your Enrollment Number'
                    onChange={(e) => setValues({...values, enroll: e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="Password"><strong>Password</strong></label>
                    <input type="password" id="password" placeholder='Enter Your Password'
                   onChange={(e) => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'><strong>Log In</strong></button>
            </form>
        </div>
        </div>
    )
}

export default Login