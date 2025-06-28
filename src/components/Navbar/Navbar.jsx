import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMobileAlt, faEnvelope, faUtensils, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginPopup from '../LogingPopup/LogingPopup';

const Navbar = () => {
  const [menu, setMenu] = useState('Home');
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className='navbar'>
        <Link to='/' onClick={() => handleMenuClick('Home')}>
          <img src={assets.logo} alt='Company Logo' className='logo' />
        </Link> 

        <button 
          className='mobile-menu-toggle' 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to='/' 
              onClick={() => handleMenuClick('Home')} 
              className={menu === 'Home' ? 'active' : ''}
              aria-current={menu === 'Home' ? 'page' : undefined}
            >
              <FontAwesomeIcon icon={faHome} className='menu-icon' /> Home
            </Link>
          </li>
          <li>
            <a 
              href='#explore-menu' 
              onClick={() => handleMenuClick('Menu')} 
              className={menu === 'Menu' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faUtensils} className='menu-icon' /> Menu
            </a>
          </li>
          <li>
            <a 
              href='#app-download' 
              onClick={() => handleMenuClick('Mobile-app')} 
              className={menu === 'Mobile-app' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faMobileAlt} className='menu-icon' /> Mobile App
            </a>
          </li>
          <li>
            <a 
              href='#footer' 
              onClick={() => handleMenuClick('Contact-Us')} 
              className={menu === 'Contact-Us' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faEnvelope} className='menu-icon' /> Contact Us
            </a>
          </li>
        </ul>

        <div className='navbar-right'>
          <div className='navbar-search-icon' aria-label='Search'>
            <img src={assets.search_icon} alt='' />
          </div>
          
          <Link to='/cart' aria-label='Shopping cart'>
            <div className='basket-container'>
              <img src={assets.basket_icon} alt='' />
              <div className='dot'></div>
            </div>
          </Link>
          
          <button 
            className='sign-in-btn' 
            onClick={() => setShowLogin(true)}
            aria-label='Sign in'
          >
            Sign In
          </button>
        </div>
      </div>

      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </>
  );
};

export default Navbar;