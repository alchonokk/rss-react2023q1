import { render, screen } from '@testing-library/react';
import React from 'react';
import { CardForm } from './CardFromForm';

describe('CardsBox', () => {
  beforeEach(() => {
    render(
      <CardForm name={'My'} surName={''} date={''} city={''} gender={'male'} filePicture={''} />
    );
  });

  test('name', () => {
    expect(screen.getByText(/My/i)).toBeInTheDocument();
  });

  test('cardsBox', () => {
    expect(screen.getByTestId('form-card')).toBeInTheDocument();
  });

  test('cardImage', () => {
    screen
      .getAllByTestId('cardImage')
      .map((cardImg) => expect(cardImg.querySelector('img')).toBeDefined());
  });

  test('cardGender', () => {
    expect(screen.getByTestId('gender-female')).toHaveTextContent('male');
  });
});
