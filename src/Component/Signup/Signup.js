import React from 'react'
import './Signup.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const SignIn = ({ updateUserData }) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        setsignInMessage({
            successfull: "",
            Name: "",
            UserName: "",
            Email: "",
            Password: "",
            RePassword: "",
        })
        var res;
        const { Name, UserName, Email, Password, RePassword } = SignInData

        //checking SignInData
        setsignInMessage({
            Name: Name === "" ? "Name cannot be empty" : "",
            UserName: UserName === "" ? "UserName cannot be empty" : "",
            Email: Email === "" ? "Email cannot be empty" : "",
            Password: Password === "" ? "Password cannot be empty" : "",
            RePassword: RePassword === "" ? "Confirmation Password cannot be empty" : "",
        })
        if (Name === "" || UserName === "" || Email === "" || Password === "" || RePassword === "") {
            setTimeout(() => {
                setLoading(false);
            }, 400);
            return
        }


        console.log("value = ", process.env.REACT_APP_ISPRODUCTION)
        if (process.env.REACT_APP_ISPRODUCTION === 'true') {
            // console.log("production")
            res = await axios.post(`http://localhost:5000/SignUp`, SignInData)
                .catch((e) => { console.log(e) })
        }
        else {
            // console.log("deployment")
            res = await axios.post(`${process.env.REACT_APP_BASE_URL}/SignUp`, SignInData)
                .catch((e) => { console.log(e) })
        }
        // console.log("before", res.data)
        setIsValid(res.data.isValid)
        // console.log("after", res.data)
        setsignInMessage(res.data.message);
        if (res.data.isValid) {
            setLoading(false);
            updateUserData({ Name, UserName, Email });
            setSignInData({
                Name: "",
                UserName: "",
                Email: "",
                Password: "",
                RePassword: "",
            })
            navigate('/')
        }
        else {
            setLoading(false);
        }
    }
    return (
        <>

            <div className='signin-container'>
                {loading ? (
                    <LoadingComponent />
                ) : (
                    <form action="#" className='sign-up-form'>
                        <div className={`${isValid ? "success-msg" : "signUp-head"}`}>{isValid ? "Successfull SigUn" : "SignUp Here"}</div>
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
                )
                }
            </div>

        </>
    )
}

export default SignIn