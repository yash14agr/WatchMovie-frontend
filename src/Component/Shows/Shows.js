import React from 'react'
import { Link } from 'react-router-dom';
import "./Shows.css";
function shows({ movieData }) {
  return (
    <>
      <div className="show">
        {movieData &&
          movieData.map((item, key) => (
            <Link to="/details" state={item} key={key} className='showLink'>
              <div key={item.show.id} className="item-container">
                {/* <div> */}
                <img src={item.show.image?.medium || 'https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg'} alt='error' className='show-image' />
                {/* </div> */}
                <div className='show-container'>
                  <div className="show-txt " id='show-name'>{item.show.name}</div>
                  <div className="show-txt ">{item.show.language}</div>
                  {/* <div className="show-txt ">{item.show.genres.join(`/`)}</div> */}
                  <div className="show-txt ">{item.show.genres[0]}</div>

                </div>
              </div>
            </Link>
          ))}

      </div>
    </>
  )
}

export default shows