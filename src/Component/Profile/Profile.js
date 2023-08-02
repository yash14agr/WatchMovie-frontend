import React from 'react'
import './Profile.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProfileMovieContainer from '../ProfileMovieContainer/ProfileMovieContainer.js'
import LoadingComponent from '../LoadingComponent/LoadingComponent';


function Profile({ userData, updateUserData, isMovieBooked }) {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [UserDataMoviesBooked, setUserDataMoviesBooked] = useState();
    // const [count, setcount] = useState(0);


    useEffect(() => {
        const getUserDataMovieBooked = async () => {
            console.log("setting true")
            setLoading(true)
            var res;
            if (process.env.REACT_APP_ISPRODUCTION === "true") {
                res = await axios.post(`http://localhost:5000/Profile`, userData)
                    .catch(e => { console.log(e) })
            }
            else {
                res = await axios.post(`${process.env.REACT_APP_BASE_URL}/Profile`, userData)
                    .catch(e => { console.log(e) })
            }
            console.log("setting false")
            setLoading(false)
            console.log(res.data.existUser)
            setUserDataMoviesBooked(res.data.existUser)
            // console.log("movie data:", UserDataMoviesBooked.MoviesBooked[0]?.MovieName)
            // console.log("rendering profile1: ", count);
        }
        getUserDataMovieBooked();
    }, [isMovieBooked, userData])

    const HandleLogout = () => {
        const data = {
            Name: '',
            Email: '',
            UserName: ''
        }
        updateUserData(data);
        navigate('/');
    }


    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (


                <div className='profileMainContainer'>
                    <h1>My Profile</h1 >
                    <div className='profileDetailContainer'>
                        <div className='ProfileDetailSubContainer1'>
                            {/* <img src=''></img> */}
                            <p>
                                {userData.Email.charAt(0).toUpperCase()}
                            </p>
                        </div>
                        <div className='ProfileDetailSubContainer2'>
                            <div className='profileDetailbox'>
                                <p className='profileLabels'>Name</p>
                                <p className='profileUserData'>{userData.Name}</p>
                            </div>
                            <div className='profileDetailbox'>
                                <p className='profileLabels'>UserName</p>
                                <p className='profileUserData'>{userData.UserName}</p>
                            </div>
                            <div className='profileDetailbox'>
                                <p className='profileLabels'>Email</p>
                                <p className='profileUserData'>{userData.Email}</p>
                            </div>
                            <button onClick={HandleLogout} className='profileLogoutbtn'>Logout</button>
                        </div>

                    </div>

                    {/* <p>Movie-Name{UserDataMoviesBooked ? UserDataMoviesBooked.MoviesBooked[0] : " none"}</p> */}
                    <h3>List of Movies Booked</h3>
                    <div className='profileMovieContainer'>
                        {!UserDataMoviesBooked &&
                            <h3>No Movie Booked</h3>
                        }

                        {
                            UserDataMoviesBooked &&
                            // Object.keys(UserDataMoviesBooked).map((key) =>
                            UserDataMoviesBooked.MoviesBooked.map((data, i) => {
                                return (
                                    // <p>{data.MovieName}</p>
                                    <ProfileMovieContainer key={i} data={data} userData={userData} />
                                )
                            })

                        }
                    </div>

                </div >
            )
            }
        </>
    )
}

export default Profile