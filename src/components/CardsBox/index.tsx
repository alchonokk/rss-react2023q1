import React from 'react';
import { data } from 'data';
import { Card } from './Card';
import './style.css';

type CardsState = object;

type CardsProps = object;

class CardsBox extends React.Component<CardsProps, CardsState> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    return (
      <section data-testid="cardsSection" className="cards-box">
        {data.map((book) => {
          return <Card key={book.imageNum} {...book}></Card>;
        })}
      </section>
    );
  }
}

export { CardsBox };
