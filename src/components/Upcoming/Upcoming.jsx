import React, { useEffect, useState } from 'react'
import Header from '../Header/Header.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Upcoming.css'
import IconContainer from '../IconContainer/IconContainer.jsx'
import Pagination from '../Pagination/Pagination.jsx'
const API_KEY = process.env.REACT_APP_API_KEY;
export default function Upcoming() {
    let [Upcomings,setUpcomings]=useState([])
    let [date,setDate]=useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    
    
    async function getUpcomingMovies(page){
      let {data} = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
        params: {
          api_key: API_KEY,
          page: page
        }
      });
      setUpcomings(data.results);
      setDate(data.dates)
      setIsLoading(false); 
    
    }
    let navigate= useNavigate()
    useEffect(()=>{
      getUpcomingMovies(currentPage)
    },[currentPage])
  
    const handleMovieClick = (movieId) => {
      navigate(`/review/${movieId}`);
    };
    
    return (
      <div>
          <Header
  title="Upcomings Movies"
  desc=""
  height="75"
  />
  
  <div className="container">
  {isLoading ? (
         <div className="d-flex justify-content-center">
         <div className="spinner-border" role="status">
           <span className="visually-hidden">Loading...</span>
         </div>
       </div>
       
        ) : (
          <>
            {/* Render movies once loading is complete */}
            <h2 className='mb-3 mt-5 date'>{`Coming in ${date.minimum} _ ${date.maximum}`}</h2>
  <div className="row">
  {
  Upcomings.map((com, index)=>{
        return <div className="col-md-3 mb-3 text-center" key={index}>
              < div className="card  p-2">
               <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${com.poster_path}`} alt={com.overview} onClick={() => handleMovieClick(com.id)}/>           
                  < h3>{com.title}</h3>
                  <p style={{ fontSize: '20px' }}>
                                    <div className="stars" style={{ '--vote-average': `${com.vote_average * 10}%` }}></div>
                                </p>
                                <div className="icon-container">
               
                <IconContainer accountId="21090818" movieId={com.id} /> 
               
                 </div>
                </div>
          </div>
           })
         }
  
  </div>
          
          </>
        )}

  
  </div>
  <Pagination currentPage={currentPage} handlePageChange={setCurrentPage} />
      </div>
    )
}
