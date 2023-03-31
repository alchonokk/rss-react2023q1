import { ROUTES } from 'constants/appConstants';
import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="page">
      <h2 className="page-title">404</h2>
      <p>
        This is page 404. Go
        <NavLink to={ROUTES.MAIN}> HOME! </NavLink>
      </p>
    </div>
  );
};

export { ErrorPage };
