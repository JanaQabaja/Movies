import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx';
import IconContainer from '../IconContainer/IconContainer.jsx';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.jsx';
const WatchList = () => {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accountId = process.env.ACCOUNT_ID; // Replace with the user's account ID
  const token = process.env.REACT_APP_TOKEN;
  const tword = process.env.REACT_APP_TWORD;
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
 
  useEffect(() => {
    const fetchWatchListMovies = async (page) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/account/${process.env.ACCOUNT_ID}/watchlist/movies`,
          {
            params: {
              language: 'en-US',
              page: page,
              sort_by: 'created_at.asc'
            },
            headers: {
              Authorization: `${tword} ${token}`,
              Accept: 'application/json'
            }
          }
        );
        setWatchlistMovies(response.data.results);
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false); 
        console.error('Error fetching watchlist movies:', error);
      }
    };
    fetchWatchListMovies(currentPage);
  }, [accountId, currentPage ,token,tword]);

  const handleMovieClick = (movieId) => {
    navigate(`/review/${movieId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header
        title="Watchlist Movies"
        desc=""
        height="30"
      />
    {isLoading ? (
         <div className="d-flex justify-content-center">
         <div className="spinner-border" role="status">
           <span className="visually-hidden">Loading...</span>
         </div>
       </div>
       
        ) : (
          <>
            {/* Render movies once loading is complete */}
            <div className="container">
        <h2 className='mb-3 mt-5 '><FaClipboardList style={{ color: 'rgb(48, 7, 59)', marginRight: '5px' }} />Watchlist Movies</h2>
        <div className="row">
          {watchlistMovies.map((movie, index) => (
            <div className="col-md-3 mb-3 text-center" key={index}>
              <div className="card p-2 bc">
                <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.overview} onClick={() => handleMovieClick(movie.id)} />
                <h3>{movie.title}</h3>
                <p>Votes: {movie.vote_average} /10</p>
                <div className="icon-container">
                  <IconContainer accountId={accountId} movieId={movie.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
          </>
        )}
    
    </div>
  );
};

export default WatchList;
