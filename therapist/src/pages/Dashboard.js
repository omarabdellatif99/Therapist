// src/pages/Dashboard.js
import React from 'react';
import Navigator from '../DashHeader/Header';
import Main from '../DashComp/MainComp';
import '../DashHeader/Dashstyle.css';

const Dashboard = () => {
  return (
    <div>
      <Navigator />
      <Main />
    </div>
  );
};

export default Dashboard;
