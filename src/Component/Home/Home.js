import React from 'react'
import './Home.css';
// import Nav from "../Nav/nav.js";
import Shows from "../Shows/Shows.js";


function Home({ setIsQuerySearched, isQuerySearched, movieData, SetFilteredMovieData, filteredMovieData }) {
  var validMovieData;
  if (isQuerySearched) {
    validMovieData = filteredMovieData
  }
  else {
    validMovieData = movieData
  }

  return (
    <>
      {/* <Nav /> */}
      <div className='MainContiner'>

        {/* <Shows movieData={movieData} /> */}

        <Shows movieData={validMovieData} />
      </div>
    </>
  )
}

export default Home