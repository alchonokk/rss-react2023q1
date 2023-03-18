import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Test App', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  test('render header', () => {
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
  test('check aboutLink', () => {
    const aboutLink = screen.getByTestId('about-link');
    act(() => {
      userEvent.click(aboutLink);
    });
    expect(screen.getByTestId('aboutUsPage')).toBeInTheDocument();
  });
  test('check 404Link', () => {
    const link = screen.getByTestId('page404');
    act(() => {
      userEvent.click(link);
    });
    expect(screen.getByText(/page 404/i)).toBeInTheDocument();
  });
});
