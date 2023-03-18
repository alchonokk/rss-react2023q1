import { CardsBox } from 'components/CardsBox';
import { SearchBox } from 'components/SearchBox';
import React from 'react';

const MainPage = () => {
  return (
    <>
      <div className="page">
        <h2 className="page-title">Main</h2>
        <SearchBox />
        <CardsBox />
      </div>
    </>
  );
};

export { MainPage };
