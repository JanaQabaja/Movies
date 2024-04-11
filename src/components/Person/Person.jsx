
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.jsx';
const API_KEY = process.env.REACT_APP_API_KEY;
export default function Person() {
  const [persons, setPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  async function getTrendingPersons(page) {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/trending/person/week', {
        params: {
          api_key: API_KEY,
          page: page
        }
      });
      setPersons(data.results);
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
      console.error('Error fetching trending persons:', error);
    }
  }

  useEffect(() => {
    getTrendingPersons(currentPage);
  }, [currentPage]);

  const handleClick = (personId) => {
    navigate(`/PersonInf/${personId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header title="Trending Characters" desc="" height="75" />

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
        <h2 className='mb-3 mt-5'>Characters</h2>
        <div className="row">
          {persons.map((person, index) => (
            <div className="col-md-3 mb-3 text-center" key={index}>
              <div className="card p-2 ">
                <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt='img not valid' onClick={() => handleClick(person.id)} />
                <h3>{person.name}</h3>
                <p>{person.known_for_department}</p>
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
}
