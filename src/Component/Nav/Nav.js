import './Nav.css';
import logo from "../../Images/logo.jpg";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"


function Nav({ setIsQuerySearched, userData, movieData, SetMovieData, filteredMovieData, SetFilteredMovieData }) {
  let navigate = useNavigate();
  // console.log("user Data = ", userData)
  const [query, setquery] = useState('')

  const UserIconClickHandler = () => {
    console.log(userData)
    if (userData.Name === '') {
      alert('please signUp / login first ')
    }
    else {
      navigate('/Profile')
    }
  }

  //search component
  //checking if movie-name  contains str, if contains/includes then return that movie-name
  const HandleSearchValueChange = async (e) => {
    let str = e.target.value
    setquery(str)
    const FilteredMovieData = await movieData.filter((item) => {
      if (str === '') {
        setIsQuerySearched(false)
        return movieData
      }
      setIsQuerySearched(true)
      return item.show.name.toLowerCase().includes(str.toLowerCase())
    })

    SetFilteredMovieData(FilteredMovieData)
  }

  return (
    <>
      <div className='NavMainContainer'>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => { navigate('/') }}>
            <img src={logo} alt='error' id="logo"></img>
            <span>BookMovieOnspot</span>
          </div>

          <div className="nav-menu">
            <Link to="/" >Home</Link>
            {/* <Link to="ShowData" >Data</Link> */}
            {/* <Link to="/" >About</Link> */}
            {/* <Link to="/" >Contact</Link> */}
            {userData.Name === "" &&
              <Link to="/SignUp">SignUp</Link>
            }
            {userData.Name === "" &&
              <Link to="/Login">Log In</Link>
            }
            {
              userData.Name !== "" &&
              <Link to='/Profile' >Profile</Link>
            }
          </div>

          <div className='SearchUserIconContainer'>

            <input type="search" placeholder='Search' id='search-bar' value={query || ''} onChange={HandleSearchValueChange}></input>

            {userData.Name !== "" &&
              <div className='user-icon' onClick={UserIconClickHandler}>
                <i className="fa-solid  fa-lg" >{userData.Name.charAt(0)}</i>
              </div>}
            {userData.Name === "" &&
              <div className='user-icon' onClick={UserIconClickHandler}>
                <i className="fa-solid fa-user fa-lg fa-sm fa-xs" ></i>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav