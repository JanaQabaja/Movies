import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { MdHowToVote } from "react-icons/md";
import { FaStar } from 'react-icons/fa';
import { BsSendCheck } from "react-icons/bs";
import { BsSendX } from "react-icons/bs";
import { GiFilmSpool } from "react-icons/gi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import { FaVoteYea } from "react-icons/fa";
import { ImAddressBook } from "react-icons/im";
import './Review.css';
const API_KEY = process.env.REACT_APP_API_KEY;
export default function Review() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedReviews, setExpandedReviews] = useState({}); // State to track expanded reviews
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [display, setDisplay] = useState(false);
    const [msg, setMsg] = useState(' ');
    const token = process.env.REACT_APP_TOKEN;
    const tword = process.env.REACT_APP_TWORD;
    
      useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
              const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
              const reviewsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`);
              const recommendationsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`);

              setMovieDetails(movieResponse.data);
              setReviews(reviewsResponse.data.results);
              setRecommendations(recommendationsResponse.data.results);
            } catch (error) {
              console.error('Error fetching movie details:', error);
            }
          };
        fetchMovieDetails();
      }, [movieId,rating]);

 

  const handleRatingSubmit = async () => {
    try {
        await axios.post(
            `https://api.themoviedb.org/3/movie/${movieId}/rating`,
            { value: rating },
            {
                headers: {
                  
                    Authorization:`${tword} ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Rating submitted successfully!');
        setMsg('Submitted successfully!');
      
    } catch (error) {
        console.error('Error submitting rating:', error);
        setMsg('error!!')
    }
};
      const handleRatingDelete =async()=>{
        try {
          const response = await axios.delete(`https://api.themoviedb.org/3/movie/${movieId}/rating`, {
              headers: {
                  Authorization:`${tword} ${token}`
              }
          });
          console.log('Rating deleted successfully:', response.data);
          // You can handle further actions after the rating is deleted
          setMsg('deleted successfully!')
      } catch (error) {
          console.error('Error deleting rating:', error);
          // Handle errors appropriately
      }
      }
     
    const truncateContent = (content, maxLength) => {
      if (content.length <= maxLength) {
          return { truncatedContent: content, isTruncated: false }; // Return full content if it's not truncated
      }
      const truncatedContent = content.substring(0, maxLength);
      return { truncatedContent: truncatedContent + '...', isTruncated: true }; // Return truncated content
  };

  const toggleReviewExpansion = (index) => {
      setExpandedReviews(prevState => ({
          ...prevState,
          [index]: !prevState[index] // Toggle the state of the review at the specified index
      }));
  };
      const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
      };
      const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
      };
      


      const [scrollIndex, setScrollIndex] = useState(0);

      const handleScrollLeft = () => {
          setScrollIndex(Math.max(0, scrollIndex - 1));
      };
  
      const handleScrollRight = () => {
          setScrollIndex(Math.min(recommendations.length - 3, scrollIndex + 1));
      };

      return (
        <div className="backk">
          <div className="sideNav">
            <nav>
            <li><a href="#About">
            <ImAddressBook className='fas'/>
                <span className='nav-item'>About</span>
              </a></li>
              <li><a href="#Reviews">
                <HiChatBubbleLeftRight className='fas'/>
                <span className='nav-item'>Reviews</span>
              </a></li>
              <li><a href="#Recommendations">
                <FaVoteYea className='fas'/>
                <span className='nav-item'>Recommendations</span>
              </a></li>
              <li><a href="#Contact">
                <IoCall className='fas'/>
                <span className='nav-item'>Contact</span>
              </a></li>
            </nav>
          </div>
        <div className="container y">
          <h2 className="mb-4" id='About'>Movie Details</h2>
          {movieDetails && (
            <div className="movie-details">
              <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
              </div>
              <div className="details">
             
             
  <h3><FontAwesomeIcon icon={faFilm}/> {movieDetails.title}</h3>
  <p >{movieDetails.overview}</p>
  {movieDetails.genres && (
  <div>
    <h4>Genres:</h4>
    <ul>
      {movieDetails.genres.map(genre => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  </div>
)}
  <p><FontAwesomeIcon icon={faCalendarDays} /> {movieDetails.release_date}</p>
  
  <p style={{ fontSize: '20px' }}>Rating: <div className="stars" style={{ '--vote-average': `${movieDetails.vote_average * 10}%` }}></div></p>
  <div className='rate '>
<span>Did you watch it?</span> <button onClick={() => setDisplay(true)} className=''><MdHowToVote />Rate!</button>
<div className="yourRate mt-3" style={ {display: display ? 'block' : 'none' }}>
  {[...Array(5)].map((star,index)=>{
    const currentRating =index+1;
    return(
      <label >
        <input
        type='radio'
        name='rating'
        value={currentRating}
        onClick={()=>setRating(currentRating)}
        />
        <FaStar
        className='star'
        size={30}
        color={currentRating <=(hover || rating)? "#ffc107":"#e4e5e9"}
        onMouseEnter={()=>setHover(currentRating)}
        onMouseLeave={()=>setHover(null)}
        />
      </label>
    )
  })}
  <p className='submetRate s' onClick={handleRatingSubmit} href="#"><BsSendCheck /></p>
  <p className='submetRate d' onClick={handleRatingDelete} href="#"><BsSendX /></p>
  <p className='msg'>{msg}</p>
  </div>

</div>
</div>

            </div>
          )}
   
        <div className="ree" ><h2 id='Reviews' className="re mt-5"><GiFilmSpool className='iconcut'/>Reviews</h2></div>
        
      <div className="gradient-custom">
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12">
              <div className="text-center mb-4 pb-2">
                <FontAwesomeIcon icon={faQuoteLeft} className="fa-3x text-white" onClick={handlePrev} />
              </div>
              <div className="card rev">
                <div className="card-body  px-4 py-5">
                  <div id="carouselDarkVariant" className="carousel slide carousel-dark" data-mdb-ride="carousel">
                    <div className="carousel-inner pb-5">
                      {reviews.map((review, index) => (
                        <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                          <div className="row d-flex justify-content-center">
                            <div className="col-lg-10 col-xl-8">
                              <div className="row">
                              <div className="col-lg-4 d-flex justify-content-center">
                              {review.author_details.avatar_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`}
                                  className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                  alt="avatar"
                                  width="150"
                                  height="150"
                                />
                              ) : (
                                <img
                                  src={require('./avatar.png')} // Correct path to the default avatar image
                                  className="rounded-circle shadow-1 mb-4 mb-lg-0"
                                  alt="default avatar"
                                  width="150"
                                  height="150"
                                />
                              )}
                            </div>

                                <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
                                  <h4 className="mb-4">{review.author}</h4>
                                  <p className="mb-0 pb-3">
                                    {expandedReviews[index] || !truncateContent(review.content, 500).isTruncated ? (
                                         review.content // Show full content if expanded or not truncated
                                     ) : (
                                         <>
                                             {truncateContent(review.content, 500).truncatedContent}{' '}
                                             <span
                                                 style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                                 onClick={() => toggleReviewExpansion(index)}
                                             >
                                                 See more
                                             </span>
                                         </>
                                     )}
                                 </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-mdb-target="#carouselDarkVariant"
                      data-mdb-slide="prev"
                      onClick={handlePrev}
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-mdb-target="#carouselDarkVariant"
                      data-mdb-slide="next"
                      onClick={handleNext}
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 pt-2">
                <FontAwesomeIcon icon={faQuoteRight} className="fa-3x text-white" onClick={handleNext} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ree"><h2 id='Recommendations' className="re mt-5"><GiFilmSpool className='iconcut'/>Recommendations</h2></div>
      {recommendations.length>3? <div className="card-group-container" style={{ display: 'flex', justifyContent: 'center' }}>
  <button className='btn l' onClick={handleScrollLeft}>{'<'}</button>
  <div className="pb-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap', margin: '0 auto' }}>
    {recommendations.slice(scrollIndex, scrollIndex + 3).map((project, index) => (
      <div key={index} className="card-group" style={{ display: 'inline-block', margin: '0 10px', width: '300px' }}>
        <div className="card ">
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${project.poster_path}`} alt={project.title}  />
          <div className="card-body">
            <h5 className="card-title">{project.title}</h5>
            <p style={{ fontSize: '20px' }}>
              <div className="stars" style={{ '--vote-average': `${project.vote_average * 10}%` }}></div>
            </p> 
            <p className="card-text"><small className="text-muted">{project.media_type}</small></p>
          </div>
        </div> 
      </div>
    ))}
  </div>
  <button className='btn r'  onClick={handleScrollRight}>{'>'}</button>
</div>:<div class="noRec-container"><p className='noRec'>No recommendations!!</p></div>}
     

      </div>
     
        </div>
      );
}
