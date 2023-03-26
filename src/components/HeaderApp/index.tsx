import { ROUTES } from 'constants/appConstants';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function HeaderApp() {
  return (
    <header className="header">
      <NavLink className="navigation" to={ROUTES.MAIN}>
        Main
      </NavLink>
      <NavLink className="navigation" data-testid="about-link" to={ROUTES.ABOUT_US}>
        ABOUT US
      </NavLink>
      <NavLink className="navigation" data-testid="page404" to="*">
        404
      </NavLink>
      <NavLink className="navigation" data-testid="formPage-link" to={ROUTES.FORM}>
        Form
      </NavLink>
    </header>
  );
}

export default HeaderApp;
