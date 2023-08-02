import React from 'react'
import './BookTicketDetails.css'
import { Link } from 'react-router-dom'


function BookTicketDetails({ item, handleBookClick, formData, handleInputChange, price }) {



    const regex = /(<([^>]+)>)/ig;
    const UpdatedSummary = item.show.summary.replace(regex, '');


    return (
        <>
            < div className='ShowDetailClass'>
                <div className='DetailClass1'>

                    <div className='BookTicketImgcontainer'>
                        <img className="detailed-image" src={item.show.image?.original || 'https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg'} alt="Error" />
                    </div>
                    <div className='DetailClass2'>
                        <div><span>Name:</span> {item.show.name ? item.show.name : 'not available'}</div>
                        <div><span>Price:</span> {price}</div>
                        <div><span>Genres:</span> {item.show.genres?.join(', ') || 'not available'}</div>
                        <div><span>Language:</span> {item.show.language ? item.show.language : 'not available'}</div>
                        <div><span>Status:</span> {item.show.status ? item.show.status : 'not available'}</div>
                        <div><span>Schedule-time:</span> {item.show.schedule.time ? item.show.schedule.time : 0}</div>
                        <div><span>Schedule-day:</span> {item.show.schedule.days.length ? item.show.schedule.days.join(', ') : 0}</div>
                        <div><span>Premiered:</span> {item.show.premiered?.substring(0, 4) || 'Not released'}</div>
                        <div><span>Rating:</span> {item.show.rating.average ? item.show.rating.average : '5'}</div>
                    </div>

                </div>
                <div className='summaryClass'>

                    <div><span>Summary:</span> {UpdatedSummary}</div>
                    <p id='book-ticket-container'>
                        <span><label name="TotalSeat">Total Seat : </label>
                            <input type="number" name="TotalSeat" min="1" max="50" step="1" value={formData.TotalSeat || ""} onChange={handleInputChange}></input></span>

                        <Link to="/details" onClick={handleBookClick} state={item} className='show-details ShowLink'>
                            Book Ticket
                        </Link>
                    </p>
                </div >

            </div>
        </>
    )
}

export default BookTicketDetails