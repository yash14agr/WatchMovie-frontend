import React from 'react'
import './Login.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const Login = ({ updateUserData }) => {

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    var res;

    //checking if Email and Password are empty
    setLoginMessage({
      Email: loginData.Email === "" ? "Email cannot be empty" : "",
      Password: loginData.Password === "" ? "Password Cannot be empty" : "",
    })
    if (loginData.Email === "" || loginData.Password === "") {
      setTimeout(() => {
        setLoading(false);
      }, 400);
      return
    }

    if (process.env.REACT_APP_ISPRODUCTION === "true") {
      console.log("production")
      res = await axios.post(`http://localhost:5000/Login`, loginData).catch(e => { console.log(e) })
    }
    else {
      console.log("deployment")
      res = await axios.post(`${process.env.REACT_APP_BASE_URL}/Login`, loginData).catch(e => { console.log(e) })
    }

    setLoginMessage(res.data.message);
    setIsValid(res.data.isValid)
    if (res.data.isValid) {
      setLoading(false);
      const { Name, UserName, Email } = res.data.userData;
      updateUserData({ Name, UserName, Email });
      setLoginData({
        Email: '',
        Password: ''
      })
      navigate('/')
    }
    else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='login-container'>
        {
          loading ? (

            <LoadingComponent />
          ) :
            (

              < form action="#" className='login-form'>
                <div className={`${isValid ? "success-msg" : "login-head"}`}>{isValid ? "Login Successfull" : 'Login Here'}</div>
                <input type='email' placeholder='Enter Email-id' name='Email' value={loginData.Email || ''} onChange={HandleOnChange} className='input-tag'></input>
                <div className='checkValidation'>{loginMessage.Email}</div>
                {console.log("in Console:", loginMessage.Email)}
                <input type='password' placeholder='Enter Password' name='Password' value={loginData.Password || ''} onChange={HandleOnChange} className='input-tag'></input>
                <div className='checkValidation'>{loginMessage.Password}</div>
                <Link to="/SignUp" className='login-Link'>Dont have an account? Sign-up</Link>
                {/* <button onClick={HandleSubmitButton} className='btn-login' state={{ userData: userData }}>Login</button> */}
                <button onClick={HandleSubmitButton} className='btn-login' >Login</button>
              </form>
            )
        }
      </div >
    </>
  )
}

export default Login