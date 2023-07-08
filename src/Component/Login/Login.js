import React from 'react'
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ updateUserData }) => {
  const [isValid, setIsValid] = useState(false)
  const [loginMessage, setLoginMessage] = useState({
    successfull: '',
    Email: '',
    Password: ''
  })

  const [loginData, setLoginData] = useState({
    Email: '',
    Password: ''
  })
  const HandleOnChange = (e) => {
    const { name, value } = e.target
    setLoginData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const HandleSubmitButton = async (event) => {
    event.preventDefault();
    setLoginMessage({});
    var res;
    if (process.env.REACT_APP_ISPRODUCTION === "true") {
      console.log("production happening")
      res = await axios.post(`http://localhost:5000/Login`, loginData).catch(e => { console.log(e) })
    }
    else {
      res = await axios.post(`${process.env.REACT_APP_BASE_URL}/Login`, loginData).catch(e => { console.log(e) })
    }

    setLoginMessage(res.data.message);
    setIsValid(res.data.isValid)
    if (res.data.isValid) {
      const { Name, UserName, Email } = res.data.userData;
      updateUserData({ Name, UserName, Email });
      setLoginData({
        Email: '',
        Password: ''
      })
    }
  };

  return (
    <>
      <div className='login-container'>

        <form action="#" className='login-form'>
          <div className={`${isValid ? "success-msg" : "login-head"}`}>{isValid ? "Login Successfull" : 'Login Here'}</div>
          <input type='email' placeholder='Enter Email-id' name='Email' value={loginData.Email || ''} onChange={HandleOnChange} className='input-tag'></input>
          <div className='checkValidation'>{loginMessage.Email}</div>
          <input type='password' placeholder='Enter Password' name='Password' value={loginData.Password || ''} onChange={HandleOnChange} className='input-tag'></input>
          <div className='checkValidation'>{loginMessage.Password}</div>
          <Link to="/SignIn" className='login-Link'>Dont have an account? Sign-in</Link>
          {/* <button onClick={HandleSubmitButton} className='btn-login' state={{ userData: userData }}>Login</button> */}
          <button onClick={HandleSubmitButton} className='btn-login' >Login</button>
        </form>
      </div>
    </>
  )
}

export default Login