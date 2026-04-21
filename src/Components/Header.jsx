import React from 'react'
import './CSS/Header.css'

import { FaCartArrowDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
const Header = ({ cart }) => {
  
  const TotalItems = cart?.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src="/Images/logo.png" alt="" />
        </div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul>

        <Link to='/cart'>
          <div className='Cart'>
            {cart
              ?.length > 0 && <span>{TotalItems}</span>}
            <FaCartArrowDown />
          </div>
        </Link>
      </div>
    </>
  )
}

export default Header