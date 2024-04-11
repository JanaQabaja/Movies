import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaClipboardList } from 'react-icons/fa';
import { MdOutlineLocalMovies } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import './Navbar.css';
export default function Navbar({user , logout}) {
  return (
<nav className="navbar navbar-expand-lg bg-dark fixed-top">
  <div className="container">
    <Link className="navbar-brand text-white fw-bold logo-text" to=""><MdOutlineLocalMovies className=' logo text-white '/>Movies World</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="">Home</Link>
        </li>


        {user!==null? <> 
        <li className="nav-item">
          <Link className="nav-link text-white" to="movie">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="upcoming">Upcoming</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link text-white" to="person">Characters</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link text-white" to="search">Search<IoMdSearch/></Link>
        </li> 
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  style={{ color: 'white' }} href="ji" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Lists
          </a>
        <ul className="dropdown-menu">
             <li><Link className="dropdown-item" to="watchList"><FaClipboardList style={{ fontSize: '20px' }} className='lists' />Watch List</Link></li>
            <li><Link className="dropdown-item" to="favoriteList"><FaHeart style={{ fontSize: '20px' }} className='lists'/>Favorite List</Link></li>
             </ul>
             </li>
         <li className="nav-item">
         <span className="nav-link text-white" style={{cursor:'pointer'}} onClick={()=>logout()}>Logout</span>
       </li>
       

       </> :
        <> 
        <li className="nav-item">
          <Link className="nav-link text-white" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="register">Register</Link>
        </li>
        </>}
       
       
       
      </ul>
      
    </div>
  </div>
</nav>

  )
}
