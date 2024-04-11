import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx';
import IconContainer from '../IconContainer/IconContainer.jsx';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.jsx';

const FavoriteList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const accountId = process.env.ACCOUNT_ID; // Replace with the user's account ID
  const [isLoading, setIsLoading] = useState(true);
  const token = process.env.REACT_APP_TOKEN;
  const tword = process.env.REACT_APP_TWORD;
  let navigate = useNavigate();

  

  useEffect(() => {
    const fetchFavoriteMovies = async (page) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/account/${process.env.ACCOUNT_ID}/favorite/movies`,
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
        setFavoriteMovies(response.data.results);
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false); 
        console.error('Error fetching favorite movies:', error);
      }
    };
    fetchFavoriteMovies(currentPage);
  }, [accountId, currentPage,token,tword]);

  const handleMovieClick = (movieId) => {
    navigate(`/review/${movieId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header
        title="Favorite Movies"
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
        <h2 className='mb-3 mt-5 '><FaHeart style={{ color: 'red', marginRight: '5px' }} />Favorite Movies</h2>
        <div className="row">
          {favoriteMovies.map((movie, index) => (
            <div className="col-md-3 mb-3 text-center" key={index}>
              <div className="card p-2 bc">
                <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.overview} onClick={() => handleMovieClick(movie.id)} />
                <h3>{movie.title}</h3>
                <p>Votes: {movie.vote_average} /10</p>
                <div className="icon-container">
                  <IconContainer accountId="21090818" movieId={movie.id} />
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

export default FavoriteList;
