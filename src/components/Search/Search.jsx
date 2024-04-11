
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Pagination from '../Pagination/Pagination.jsx'; // Import the Pagination component
import Card from '../Card/Card.jsx'; 
import { IoMdSearch } from "react-icons/io";
import { GiFilmSpool } from "react-icons/gi";
import './Search.css'
const API_KEY = process.env.REACT_APP_API_KEY;
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsContent, setCardsContent] = useState([]);
 
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchMovies(''); // Initial search with empty string
  }, []);

  const fetchMovies = async (query, page) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: API_KEY,
          query: query,
          include_adult: false,
          language: 'en-US',
          page: page
        }
      });
      const newMovies = response.data.results;
      setCardsContent(newMovies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: API_KEY,
          query: value,
          include_adult: false,
          language: 'en-US',
          page: currentPage
        }
      });
      const newMovies = response.data.results;
      setCardsContent(newMovies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(searchTerm, page); // Fetch movies with current search term and page
  };

  // Handle clicking on a movie
  const handleMovieClick = (movieId) => {
    navigate(`/review/${movieId}`); // Navigate to the review page of the clicked movie
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="search-container">
        <span className='search-label'><IoMdSearch/>Search: </span>
        <input
          type="text"
          placeholder="Search by movie title"
          value={searchTerm}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>
      {/* Card Component */}
      {cardsContent.length > 0 ? (
        <>
          <Card movies={cardsContent} handleMovieClick={handleMovieClick} />
          <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />
        </>
      ) : (
        <div className="emp"><div className="cont"><GiFilmSpool/>Search Results</div></div>
      )}
    </div>
  );
};

export default Search;
