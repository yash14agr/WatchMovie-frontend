import React from 'react'
import './ProfileMovieContainer.css'
function ProfileMovieContainer({ data, userData }) {
    // console.log("Data =", data)
    return (
        <>
            {/* <div>ProfileMovieContainer</div> */}
            <div className='ProfileMoviesBooked-Container'>
                <div className='ProfileMoviesBooked-subContainer1'>
                    <img src={data.ImgUrl} alt='' ></img>
                </div>
                <div className='ProfileMoviesBooked-subContainer2'>
                    <p ><span className='subCotainerProfile2'>Name : </span>{userData.Name}</p>
                    <p ><span className='subCotainerProfile2'>Movie Name : </span>{data.MovieName}</p>
                    <p ><span className='subCotainerProfile2'>Language : </span>{data.Language}</p>
                    <p ><span className='subCotainerProfile2'>Time : </span>{data.Time === '0' ? '18:00' : data.Time}</p>
                    <p ><span className='subCotainerProfile2'>Day : </span>{data.Day === '0' ? "Sunday" : data.Day}</p>
                    <p ><span className='subCotainerProfile2'>Total Seats Booked : </span>{data.TotalSeat}</p>
                    <p ><span className='subCotainerProfile2'>Total Cost : </span>{data.TotalPrice}</p>
                </div>
            </div>
        </>
    )
}

export default ProfileMovieContainer