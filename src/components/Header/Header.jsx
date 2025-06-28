import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order Your Favourite Food Here</h2>
        <p>Craving something delicious? Satisfy your taste buds by choosing from our wide selection of mouth-watering dishes, delivered straight to your door...</p>
        <Link to='Menu' className='#elplore-menu'>
          <button>View Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;