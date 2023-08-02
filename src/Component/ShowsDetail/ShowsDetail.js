import React from 'react';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShowsDetail.css';
import BookTicketDetails from "../BookTicketDetails/BookTicketDetails.js"
import BookTicketForm from "../BookTicketForm/BookTicketForm.js"


function ShowsDetail({ userData, setIsMovieBooked, isMovieBooked }) {

  let navigate = useNavigate();
  const location = useLocation();
  const item = location.state;

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    Name: userData.Name,
    UserName: userData.UserName,
    Language: item.show.Language,
    MovieName: item.show.name,
    Day: item.show.schedule.days.length ? item.show.schedule.days.join(', ') : 0,
    Time: item.show.schedule.time ? item.show.schedule.time : 0,
    Email: userData.Email,
    ImgUrl: item.show.image?.medium || 'https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg',
    // PhoneNo: '',
    TotalSeat: '',
    TotalPrice: '',
  });

  // const price = Math.floor(Math.random() * 100) + 101;
  const price = 199;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(!isFormSubmitted)
    setIsMovieBooked(!isMovieBooked)
    // handleBookClick();

    //send data to backend and send message
    console.log("sending request!!")
    var res;
    if (process.env.REACT_APP_ISPRODUCTION === "true") {
      res = await axios.post(`http://localhost:5000/UserDetails`, formData)
        .then((msg) => {
          res = msg.data
        })
        .catch(e => console.log(e))
    }
    else {
      res = await axios.post(`${process.env.REACT_APP_BASE_URL}/UserDetails`, formData)
        .then((msg) => {
          res = msg.data
        })
        .catch(e => console.log(e))

    }
    // navigate('/SeatBooked');
  };

  //creating popup

  const handlePopupBtn = (event) => {
    event.preventDefault();

    setIsFormSubmitted(!isFormSubmitted)
    navigate('/');
  }

  const handleBookClick = () => {
    if (userData.Name === "") {
      alert("Please Login/SignUp first");
      try {
        navigate('/Login');
      }
      catch (e) {
        console.log(e)
      }
    }
    else if (formData.TotalSeat === "") {
      alert("please select number of seats")
    }
    else {
      formData.TotalPrice = formData.TotalSeat * price;
      setIsFormVisible(!isFormVisible);
    }
  };

  return (
    <>
      <div className='showDetailMainContainer'>

        {!isFormSubmitted && !isFormVisible &&
          <BookTicketDetails item={item} handleBookClick={handleBookClick} formData={formData} handleInputChange={handleInputChange} price={price} />
        }

        {
          isFormVisible &&
          <BookTicketForm handleSubmit={handleSubmit} formData={formData} item={item} handleBookClick={handleBookClick} handleInputChange={handleInputChange} />
        }

        {
          isFormSubmitted &&
          <div className='popuptext'>
            <p className='popuptext-1'>Thank You!</p>
            <p className='popuptext-2'>Your Details have been successfully submitted.</p>
            <p className='popuptext-2'>Please check your Email.</p>
            <button type="submit" onClick={handlePopupBtn} className='popup-btn'>close</button>
          </div>
        }
      </div>
    </>
  );
}

export default ShowsDetail;
