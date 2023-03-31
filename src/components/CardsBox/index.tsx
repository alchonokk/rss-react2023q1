import React from 'react';
import { data } from 'data';
import { Card } from './Card';
import './style.css';

function CardsBox() {
  return (
    <section data-testid="cardsSection" className="cards-box">
      {data.map((card) => {
        return <Card key={card.imageNum} {...card}></Card>;
      })}
    </section>
  );
}

export { CardsBox };
