import React from 'react';
import { act, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithStore } from 'store/render-with-store';
import { BrainState } from 'store/reduxSlice';

describe('Test App', () => {
  const customInitialState: Partial<{ brain: BrainState }> = {
    brain: {
      valueApi: { status: '', totalResults: 0, articles: [] },
      status: 'idle',
      valueSearch: '',
      infoFromForm: [],
    },
  };

  beforeEach(() => {
    renderWithStore(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      customInitialState
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
  test('check form link', () => {
    const link = screen.getByTestId('formPage-link');
    act(() => {
      userEvent.click(link);
    });
    expect(screen.getByText(/Complete Form/i)).toBeInTheDocument();
  });
});
