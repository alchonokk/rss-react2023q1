import createUrlForImage from 'helpers/createCardUrl';
import React from 'react';

type CardType = {
  author: string;
  name: string;
  year: string;
  imageNum: string;
  category: string;
};

const Card = ({ author, name, year, category, imageNum }: CardType) => {
  return (
    <div className="card">
      <img data-testid="cardImage" src={createUrlForImage(imageNum)} alt="img picture" />
      <div className="card-information">
        <h3 className="card-name">{name}</h3>
        <p className="card-detail">{author}</p>
        <p className="card-detail">Год: {year}</p>
        <h5 className="card-category">Категория: {category}</h5>
      </div>
    </div>
  );
};

export { Card };
