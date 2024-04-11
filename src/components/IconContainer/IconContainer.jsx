
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaClipboardList } from 'react-icons/fa';

const IconContainer = ({ accountId, movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchList, setWatchList] = useState(false);
  useEffect(() => {
    const fetchFavoriteState = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`,
          {
            params: {
              language: 'en-US',
              page: 1,
              sort_by: 'created_at.asc',
            },
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjgyN2QzYzBkZjljZmM4ZTlkZjRmOGMwNzlkOWMxNiIsInN1YiI6IjY1ZWYxMzAxMWI3MjJjMDE4NmQ1NDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C1dBc2UjdUy2CA9-74Kl5Oicm9EjSMY2N4mBRWaiIcM',
              Accept: 'application/json',
            },
          }
        );
        const favoriteMovies = response.data.results;
        const isMovieFavorite = favoriteMovies.some(
          (movie) => movie.id === movieId
        );
        setIsFavorite(isMovieFavorite);
      } catch (error) {
        console.error('Error fetching favorite state:', error);
      }
    };
    const fetchWatchList = async () => {
        try {
          const response2 = await axios.get(
            `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
            {
              params: {
                language: 'en-US',
                page: 1,
                sort_by: 'created_at.asc',
              },
              headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjgyN2QzYzBkZjljZmM4ZTlkZjRmOGMwNzlkOWMxNiIsInN1YiI6IjY1ZWYxMzAxMWI3MjJjMDE4NmQ1NDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C1dBc2UjdUy2CA9-74Kl5Oicm9EjSMY2N4mBRWaiIcM',
                Accept: 'application/json',
              },
            }
          );
          const watchlistMovies = response2.data.results;
          const isMovieInWatchList = watchlistMovies.some(
            (movie) => movie.id === movieId
          );
          setWatchList(isMovieInWatchList);
        } catch (error) {
          console.error('Error fetching favorite state:', error);
        }
      };

    fetchFavoriteState();
    fetchWatchList();
  }, [accountId, movieId]);

  const handleHeartClick = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${accountId}/favorite`,
        {
          media_type: 'movie',
          media_id: movieId,
          favorite: !isFavorite,
        },
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjgyN2QzYzBkZjljZmM4ZTlkZjRmOGMwNzlkOWMxNiIsInN1YiI6IjY1ZWYxMzAxMWI3MjJjMDE4NmQ1NDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C1dBc2UjdUy2CA9-74Kl5Oicm9EjSMY2N4mBRWaiIcM',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setIsFavorite(!isFavorite);
      console.log(response.data);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  const handleWatchClick = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist`,
        {
          media_type: 'movie',
          media_id: movieId,
          watchlist: !watchList,
        },
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjgyN2QzYzBkZjljZmM4ZTlkZjRmOGMwNzlkOWMxNiIsInN1YiI6IjY1ZWYxMzAxMWI3MjJjMDE4NmQ1NDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C1dBc2UjdUy2CA9-74Kl5Oicm9EjSMY2N4mBRWaiIcM',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setWatchList(!watchList);
      console.log(response.data);
    } catch (error) {
      console.error('Error toggling watch List:', error);
    }
  };

  return (
    <div className="icon-container">
      <FaHeart
        style={{ fontSize: '26px', color: isFavorite ? 'rgb(255, 0, 0)' : 'rgb(102, 108, 113)' }}
        className="lists"
        onClick={handleHeartClick}
      />
      <FaClipboardList 
       style={{ fontSize: '26px', color: watchList ? 'rgb(48, 7, 59)' : 'rgb(102, 108, 113)' }}
       className="lists" 
       onClick={handleWatchClick} />
    </div>
  );
};

export default IconContainer;
//rgb(50, 15, 84)