import React from 'react'
import './Signup.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SignIn = ({ updateUserData }) => {
    const [isValid, setIsValid] = useState(false)
    const [signInMessage, setsignInMessage] = useState({
        successfull: "Sign Up Here",
        Name: "",
        UserName: "",
        Email: "",
        Password: "",
        RePassword: "",
    })
    const [SignInData, setSignInData] = useState({
        Name: "",
        UserName: "",
        Email: "",
        Password: "",
        RePassword: "",
    })
    const HandleOnChange = (e) => {
        const { name, value } = e.target
        setSignInData((data) => ({
            ...data,
            [name]: value,
        }))
    }

    const HandleSubmitButton = async (event) => {
        event.preventDefault();
        setsignInMessage({
            successfull: "",
            Name: "",
            UserName: "",
            Email: "",
            Password: "",
            RePassword: "",
        })
        const { Name, UserName, Email } = SignInData
        var res;
        if (process.env.REACT_APP_ISPRODUCTION === "true") {
            console.log("production")
            res = await axios.post(`http://localhost:5000/SignIn`, SignInData)
        }
        else {
            console.log("deployment")
            res = await axios.post(`${process.env.REACT_APP_BASE_URL}/SignIn`, SignInData)
        }
        // console.log("before", isValid)
        setIsValid(res.data.isValid)
        // console.log("after", isValid)
        setsignInMessage(res.data.message);
        if (res.data.isValid) {
            updateUserData({ Name, UserName, Email });
            setSignInData({
                Name: "",
                UserName: "",
                Email: "",
                Password: "",
                RePassword: "",
            })

        }
    }
    return (
        <>

            <div className='signin-container'>

                <form action="#" className='sign-up-form'>
                    <div className={`${isValid ? "success-msg" : "signUp-head"}`}>{isValid ? "Successfull Sign-In" : "Sign In Here"}</div>
                    <input type='text' placeholder='Enter Name' name='Name' value={SignInData.Name || ''} onChange={HandleOnChange} className='input-tag'></input>
                    <div className='checkValidation'>{signInMessage.Name}</div>
                    <input type='text' placeholder='Enter UserName' name='UserName' value={SignInData.UserName || ''} onChange={HandleOnChange} className='input-tag'></input>
                    <div className='checkValidation'>{signInMessage.UserName}</div>
                    <input type='email' placeholder='Enter Email-id' name='Email' value={SignInData.Email || ''} onChange={HandleOnChange} className='input-tag'></input>
                    <div className='checkValidation'>{signInMessage.Email}</div>
                    <input type='password' placeholder='Enter password' name='Password' value={SignInData.Password || ''} onChange={HandleOnChange} className='input-tag'></input>
                    <div className='checkValidation'>{signInMessage.Password}</div>
                    <input type='password' placeholder='confirm password' name='RePassword' value={SignInData.RePassword || ''} onChange={HandleOnChange} className='input-tag'></input>
                    <div className='checkValidation'>{signInMessage.RePassword}</div>
                    <div className='LinkBtnContainer'>
                    </div>
                    <Link to="/Login" className='sign-up-Link' >Already a user?</Link>
                    <button onClick={HandleSubmitButton} className='btn-signup' >Sign-up</button>

                    {/* <button onClick={HandleSubmitButton} className='btn-signup' state={{ userData: userData }}>Sign-up</button> */}
                    <button onClick={HandleSubmitButton} className=' google'>Google sign-up</button>


                </form>
            </div>

        </>
    )
}

export default SignIn