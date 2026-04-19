import React from 'react'
import { Link } from 'react-router-dom'
import '../css/SideBar.css'
export default function SideBar() {
  return (
    <div className='sidebar'>
      <ul>
        <li><Link to="/" className='lists'>Home</Link></li>
        <li><Link to="/about" className='lists'>About</Link></li>
        <li><Link to="/contact" className='lists'>Contact</Link></li>
        <li><Link to="/profile" className='lists'>Profile</Link></li>
        <li><Link to="/setting" className='lists'>Setting</Link></li>
      </ul>
    </div>
  )
}
