import FooterApp from 'components/FooterApp';
import HeaderApp from 'components/HeaderApp';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.css';

function LayoutApp() {
  return (
    <>
      <div className="body-wrapper">
        <HeaderApp />
        <Outlet />
        <FooterApp />
      </div>
    </>
  );
}

export default LayoutApp;
