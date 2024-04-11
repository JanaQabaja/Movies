
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import  './PersonInf.css';
const API_KEY = process.env.REACT_APP_API_KEY;
export default function PersonInf() {
    const { personId } = useParams();
    const [personDetails, setPersonDetails] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const personResponse = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`);
                const projectsResponse = await axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`);

                setPersonDetails(personResponse.data);
                setProjects(projectsResponse.data.cast);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchPersonDetails();
    }, [personId]);
    const [scrollIndex, setScrollIndex] = useState(0);

    const handleScrollLeft = () => {
        setScrollIndex(Math.max(0, scrollIndex - 1));
    };

    const handleScrollRight = () => {
        setScrollIndex(Math.min(projects.length - 3, scrollIndex + 1));
    };
    return (
      <div className="bpic">
        <div className="container">
            <h2 className="mb-4">Details</h2>
            {personDetails && (
                <div className="person-details">
                    <div className="poster">
                        
                        {personDetails.profile_path ? (
                          
                                <img src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`} 
                                alt={personDetails.name} 
                               />
                              ) : (
                                <img
                                  src={require('./instead.webp')} 
                                  alt={personDetails.name}
                                />
                              )}
                    </div>
                    <div className="pdetails">
                        <h3><FontAwesomeIcon icon={solidStar} style={{ color: '#ffa500' }} /> {personDetails.name}</h3>
                        <p>Birthday: {personDetails.birthday}</p>
                        {personDetails.place_of_birth && <p>Born in: {personDetails.place_of_birth}</p>}
                        <p>{personDetails.biography}</p>
                    </div>
                </div>
            )}

            
            <div className="card-group-container">
            <button className='btn l' onClick={handleScrollLeft}>{'<'}</button>
 <div className="pb-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap', margin: '0 auto' }}>
                {projects.slice(scrollIndex, scrollIndex + 3).map((project, index) => (
                    <div key={index} className="card-group" style={{ display: 'inline-block', margin: '0 10px', width: '300px' }}>
                        <div className="card ">
                            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${project.poster_path}`} alt={personDetails.name}  />
                            <div className="card-body">
                                <h5 className="card-title">{project.title}</h5>
                                <p className="card-text">Character: {project.character}</p>
                                <p className="card-text">{project.release_date?`Release date: ${project.release_date}`:' '}</p>
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
            </div>
            </div>
        </div>
    );
}
