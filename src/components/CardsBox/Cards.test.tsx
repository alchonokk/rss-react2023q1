import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardsBox } from '.';

describe('CardsBox', () => {
  beforeEach(() => {
    render(<CardsBox />);
  });

  test('cardTitle', () => {
    const cardElement = screen.getByText(/дворик/i);
    expect(cardElement).toBeInTheDocument();
  });

  test('cardsBox', () => {
    const cardsElement = screen.getByTestId('cardsSection');
    expect(cardsElement).toBeInTheDocument();
  });

  test('cardImage', () => {
    const cards = screen.getAllByTestId('cardImage');
    cards.map((card) => expect(card.querySelector('img')).toBeDefined());
  });
});
