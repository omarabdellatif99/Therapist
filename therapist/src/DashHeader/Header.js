import React from 'react';
import './headerstyle.css';
import { useNavigate } from 'react-router-dom';

const Navigator = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='navigate_blck'>
      <img src="RGB_icon_white_bluebg.png" alt="Logo"/>
      <ul className='navlist'>
        <li onClick={() => handleNavigation('/patients')}>Patients</li>
        <li onClick={() => handleNavigation('/activities')}>Activities</li>
        <li onClick={() => handleNavigation('/session-history')}>Session History</li>
        <li onClick={() => handleNavigation('/settings')}>Settings</li>
      </ul>
    </div>
  );
}

export default Navigator;
