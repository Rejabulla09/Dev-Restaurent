import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div className="home-container">
      <Header />
      <ExploreMenu 
        category={category} 
        setCategory={setCategory}
        className="explore-menu-section"
      />
      <FoodDisplay 
        category={category}
        className="food-display-section" 
      />
      <AppDownload className="app-download-section" />
    </div>
  );
};

export default Home;