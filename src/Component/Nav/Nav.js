import './Nav.css';
import logo from "../../Images/logo.jpg";
// import { useState } from 'react';
import { Link } from "react-router-dom"
function Nav({ userData }) {

  // console.log("data in Nav:", userData.Name)

  return (
    <>
      <div className='NavMainContainer'>
        <div className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt='error' id="logo"></img>
            <span>WatchMovie24</span>
          </div>

          <div className="nav-menu">
            <Link to="/" >Home</Link>
            {/* <Link to="ShowData" >Data</Link> */}
            {/* <Link to="/" >About</Link> */}
            {/* <Link to="/" >Contact</Link> */}
            {userData.Name === "" &&
              <Link to="/SignIn"
                onClick={() => { alert('As Email Authentication is still not implemented, please do enter correct Email address') }}
              >Sign In</Link>
            }
            {userData.Name === "" &&
              <Link to="/Login"
              // onClick={alert('As Email Authentication is still not implemented, please do enter correct Email address')}
              >Log In</Link>
            }
            {
              userData.Name !== "" &&
              <Link to='/Profile' >Profile</Link>
            }
          </div>

          <div className='SearchUserIconContainer'>
            <input type="search" placeholder='Search' id='search-bar' ></input>
            {userData.Name !== "" &&
              <div className='user-icon'>
                <i className="fa-solid  fa-lg" >{userData.Name.charAt(0)}</i>
              </div>}
            {userData.Name === "" &&
              <div className='user-icon'>
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