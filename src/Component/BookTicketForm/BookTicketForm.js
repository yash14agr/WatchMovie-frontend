import React from 'react'
import './BookTicketForm.css'
function BookTicketForm({ isFormSubmitted, handleSubmit, formData, item, handleBookClick, handleInputChange }) {
    return (
        <>
            < form onSubmit={handleSubmit} className={`FormMainContaier
                 ${isFormSubmitted ?'BlurForm': "" }
             `} >
                <h3 >Please check the Details</h3>
                <div className='formSubMinContainer'>

                    <div className='FormContainer'>

                        <div className='FormSubContainer1'>

                            <p><span><label name="Name"> Name : </label>
                                <input type="text" name="Name" id="Name" value={formData.Name || 'not define'} onChange={handleInputChange} readOnly />
                            </span></p>
                            <p><span><label name="UserName"> UserName : </label>
                                <input type="text" name="UserName" id="UserName" value={formData.UserName || "not define"} onChange={handleInputChange} readOnly />
                            </span></p>
                            <p><span><label name="Email">Email  : </label>
                                <input type="text" name="Email" id="Email" value={formData.Email || "not define......."} onChange={handleInputChange} readOnly />
                            </span></p>
                            <p><span><label name="TotalSeat"> Total Seat Selected : </label>
                                <input type="number" name="TotalSeat" id="TotalSeat" value={formData.TotalSeat || "Not selected"} onChange={handleInputChange} readOnly />
                            </span></p>

                        </div>


                        <div className='FormSubContainer2'>

                            <p><span><label htmlFor="MovieName" >Movie Name : </label>
                                <input type="text" id="MovieName" name="MovieName" value={item.show.name} readOnly />
                            </span></p>
                            <p><span><label name="Day" >Day :</label>
                                <input type="text" name="Day" id="Day" value={item.show.schedule.days.length ? item.show.schedule.days.join(', ') : 0} readOnly></input>
                            </span></p>
                            <p><span><label name="Time" >Time :</label>
                                <input type="text" name="Time" id="Time" value={item.show.schedule.time ? item.show.schedule.time : 0} readOnly></input>
                            </span></p>
                            <p><span><label name="TotalPrice"> Total price : </label>
                                <input type="number" name="TotalPrice" id="TotalPrice" value={formData.TotalPrice || "Not Selected"} onChange={handleInputChange} readOnly />
                            </span></p>

                        </div>




                    </div>
                    <div className='form-btn-container'>
                        <button type="submit" onClick={handleSubmit} className='show-details ShowLink'>Submit</button>
                        <button type="submit" onClick={handleBookClick} className='show-details ShowLink'>Back</button>
                    </div>
                </div>
            </form >
        </>
    )
}

export default BookTicketForm