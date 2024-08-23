import React from 'react';
import './BackgroundStyles.css';
import Wallpaper from './IRLimg.js';
import Loginform from './LoginForm.js'; // Assuming LoginForm.js is in the same directory
const Backgroundart = ({children}) => {
  return (
    <>
      <div className="Circle"></div>
      <div className="Circle2"></div>
      <Wallpaper />
      <Loginform />
      {children} 
    </>
  );
};

export default Backgroundart;
