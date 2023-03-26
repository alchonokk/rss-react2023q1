import LayoutApp from 'components/LayoutApp';
import { ROUTES } from 'constants/appConstants';
import { AboutUsPage } from 'pages/AboutUsPage';
import { ErrorPage } from 'pages/ErrorPage';
import { FormPage } from 'pages/FormPage';
import { MainPage } from 'pages/MainPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<LayoutApp />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
        <Route path={ROUTES.FORM} element={<FormPage />} />
      </Route>
      <Route path="*" element={<LayoutApp />}>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
