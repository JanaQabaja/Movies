
import React from 'react';
import IconContainer from '../IconContainer/IconContainer.jsx';

const Card = ({ movies, handleMovieClick }) => {
  return (
    <div className="container">
    <div className="row">
      {movies.map((movie, index) => (
        <div className="col-md-3 mb-3 text-center" key={index}>
          <div className="card p-2 bc">
            <img
              className='rounded'
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.overview}
              onClick={() => handleMovieClick(movie.id)}
            />
            <h3>{movie.title}</h3>
            <p>Votes: {movie.vote_average} /10</p>
            <div className="icon-container">
              {/* Assuming IconContainer is another component */}
              <IconContainer accountId="21090818" movieId={movie.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Card;
