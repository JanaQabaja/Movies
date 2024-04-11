// import React, { useEffect, useState } from 'react'
// import Header from '../Header/Header.jsx'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import './Movies.css'
// import IconContainer from '../IconContainer/IconContainer.jsx'

// export default function Movies() {
//   let [movies,setMovies]=useState([])
//   async function getTrendingMovies(){
//     let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=a2827d3c0df9cfc8e9df4f8c079d9c16')
//     setMovies(data.results);
//   }
//   let navigate= useNavigate()
//   useEffect(()=>{
//     getTrendingMovies()
//   },[])

//   const handleMovieClick = (movieId) => {
//     navigate(`/review/${movieId}`);
//   };
  
//   return (
//     <div>
//         <Header
// title="Trending Movies"
// desc=""
// height="75"
// />

// <div className="container">
// <h2 className='mb-3 mt-5'>Movies</h2>
// <div className="row">
// {
// movies.map((movie, index)=>{
//       return <div className="col-md-3 mb-3 text-center" key={index}>
//             < div className="card p-2 bc">
//              <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.overview} onClick={() => handleMovieClick(movie.id)}/>           
//                 < h3>{movie.title}</h3>
//                 <p>Votes: {movie.vote_average} /10</p>
//                 <div className="icon-container">
               
//                 <IconContainer accountId="21090818" movieId={movie.id} /> 
//                  </div>
//                 </div>
//               </div>
       
//          })
//        }

// </div>
// </div>

//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx';
import { useNavigate } from 'react-router-dom';
import './Movies.css';
import Pagination from '../Pagination/Pagination.jsx';
import Card from '../Card/Card.jsx';
const API_KEY = process.env.REACT_APP_API_KEY;
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function getTrendingMovies(page) {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
        params: {
          api_key: API_KEY,
          page: page
        }
      });
      setMovies(data.results);
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setIsLoading(false); 
      console.error('Error fetching trending movies:', error);
    }
  }

  useEffect(() => {
    getTrendingMovies(currentPage);
  }, [currentPage]);

  const handleMovieClick = (movieId) => {
    navigate(`/review/${movieId}`);
  };

 
  return (
    <div>
      <Header title="Trending Movies" desc="" height="75" />
      <div className="container">
        <h2 className='mb-3 mt-5'>Movies</h2>
        {/* <div className="row">
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
                  <IconContainer accountId="21090818" movieId={movie.id} />
                </div>
              </div>
            </div>
          ))}
        </div> */}
         {/* Card Component */}
         {isLoading ? (
         <div className="d-flex justify-content-center">
         <div className="spinner-border" role="status">
           <span className="visually-hidden">Loading...</span>
         </div>
       </div>
       
        ) : (
          <>
            {/* Render movies once loading is complete */}
            <Card movies={movies} handleMovieClick={handleMovieClick} />
            <Pagination currentPage={currentPage} handlePageChange={setCurrentPage} />
          </>
        )}
      </div>
    </div>
  );
}
