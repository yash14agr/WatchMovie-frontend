import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home.js";
import ShowsDetail from "./Component/ShowsDetail/ShowsDetail.js";
import Nav from "./Component/Nav/Nav.js"
import Login from "./Component/Login/Login.js";
import SignIn from "./Component/Signup/Signup.js";
import Profile from "./Component/Profile/Profile.js";
// import TicketSubmit from "./Component/TicketSubmit/TicketSubmit.js";
import './App.css';

function App() {
  const [isQuerySearched, setIsQuerySearched] = useState(false)
  const [movieData, SetMovieData] = useState();
  const [filteredMovieData, SetFilteredMovieData] = useState(movieData);
  const [isMovieBooked, setIsMovieBooked] = useState(0)
  const [userData, setUserData] = useState({
    Name: "",
    UserName: "",
    Email: "",
  })

  const updateUserData = (data) => {
    setUserData(data);
    // console.log("in App userData: ", userData)
  }

  const getData = async () => {
    const data = await fetch(process.env.REACT_APP_API)
      .then((data) => data.json());
    if (data) {
      SetMovieData(data);
      // console.log("movieData in landing page", data)
    }
    else {
      console.error("data not present")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* <HashRouter> */}
        <Nav setIsQuerySearched={setIsQuerySearched} userData={userData} movieData={movieData} SetMovieData={SetMovieData} SetFilteredMovieData={SetFilteredMovieData} filteredMovieData={filteredMovieData} />
        <Routes>
          <Route exact path="/" element={<Home setIsQuerySearched={setIsQuerySearched} isQuerySearched={isQuerySearched} movieData={movieData} SetFilteredMovieData={SetFilteredMovieData} filteredMovieData={filteredMovieData} />} />
          <Route path="/details" element={<ShowsDetail userData={userData} setIsMovieBooked={setIsMovieBooked} isMovieBooked={isMovieBooked} />} />
          <Route path="/Login" element={<Login updateUserData={updateUserData} />} />
          <Route path="/SignUp" element={<SignIn updateUserData={updateUserData} />} />
          <Route path="/Profile" element={<Profile userData={userData} updateUserData={updateUserData} isMovieBooked={isMovieBooked} />} />
          {/* <Route path="/SeatBooked" element={<TicketSubmit  />} /> */}
        </Routes>
        {/* </HashRouter> */}
      </BrowserRouter>


    </>
  );
}

export default App;
