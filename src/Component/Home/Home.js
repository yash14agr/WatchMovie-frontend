import React from 'react'
import './Home.css';
// import Nav from "../Nav/nav.js";
import Shows from "../Shows/Shows.js";


function Home({ movieData }) {
  // console.log(movieData)
  return (
    <>
      {/* <Nav /> */}
      <div className='MainContiner'>

        <Shows movieData={movieData} />
      </div>
    </>
  )
}

export default Home