import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaEarthAfrica } from "react-icons/fa6";
import { GiVanillaFlower } from "react-icons/gi";
import { FaLinkedin } from "react-icons/fa";

import './Footer.css' ;
export default function Footer() {
  return (

<div id='Contact' className='bg-dark text-center text-white py-5 footer' style={{  bottom: 0, width: '100%' }}>
<div className='contact'>
<ul>
  <li><h3>Contact Details</h3></li>
  <li><FaInstagram/> Movies World</li>
  <li><FaFacebookSquare/> Movies World</li>
   <li><FaPhoneAlt/> +059-123-4569</li>
   <li><SiGmail/> Movies@gmail.com</li>
<li><FaEarthAfrica/> http://www.MoviesWorld.com</li>

</ul>
</div>
<div className='divider'></div>
<p className='pb-0 copy'>Movies World &copy; 12/3/2024</p>
<div className='divider'></div>
<div className="jana">
<p ><GiVanillaFlower/> Made by: Jana Qabajah</p>
<p><FaLinkedin/> Jana Qabajah</p>
</div>



</div>
  )
}
