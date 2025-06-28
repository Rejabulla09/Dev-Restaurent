import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext.jsx'; // Adjusted import for default export

const Main = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  );
}

// Call the Main function to render the app
Main();
