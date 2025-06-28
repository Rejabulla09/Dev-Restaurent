import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from '../src/components/LogingPopup/LogingPopup';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  


  return (
    <>
      {showLogin?<LoginPopup/>:<></> }
      <div className='app'>
        <Navbar setshowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/menu' element={<ExploreMenu/>} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;