import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormPage } from 'pages/FormPage';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrainState } from 'store/reduxSlice';
import { renderWithStore } from 'store/render-with-store';

describe('RenderForm', () => {
  const customInitialState: Partial<{ brain: BrainState }> = {
    brain: {
      valueApi: { status: '', totalResults: 0, articles: [] },
      status: 'idle',
      valueSearch: '',
      infoFromForm: [],
    },
  };
  beforeEach(async () => {
    renderWithStore(<FormPage />, customInitialState);
  });
  test('renders FormsPage', () => {
    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });

  describe('Input-name', () => {
    beforeEach(async () => {
      const inputElement = screen.getByTestId('input-name');
      await act(async () => {
        userEvent.type(inputElement, 'te');
      });
      await act(async () => {
        fireEvent.submit(screen.getByTestId('submit'));
      });
    });

    test('Event', () => {
      expect(screen.getByDisplayValue('te')).toBeInTheDocument();
    });

    test('ErrorLine', async () => {
      expect(screen.getByTestId('input-name-error')).toBeInTheDocument();
      expect(screen.getByTestId('input-name-error')).toHaveTextContent(
        'Name must be longer than 3 letters'
      );
    });
  });

  describe('Input-surname', () => {
    beforeEach(async () => {
      const inputElement = screen.getByTestId('input-surname');
      await act(async () => {
        userEvent.type(inputElement, 'su');
      });
      await act(async () => {
        fireEvent.submit(screen.getByTestId('submit'));
      });
    });

    test('Event', () => {
      expect(screen.getByDisplayValue('su')).toBeInTheDocument();
    });

    test('ErrorLine', async () => {
      expect(screen.getByTestId('input-surname-error')).toBeInTheDocument();
      expect(screen.getByTestId('input-surname-error')).toHaveTextContent(
        'SurName must be longer than 3 letters'
      );
    });
  });

  describe('Input-date', () => {
    beforeEach(async () => {
      const inputElement = screen.getByTestId('input-date');
      await act(async () => {
        userEvent.type(inputElement, '2022-03-07');
      });
      await act(async () => {
        fireEvent.submit(screen.getByTestId('submit'));
      });
    });

    test('Event', async () => {
      expect(screen.getByDisplayValue('2022-03-07')).toBeInTheDocument();
    });

    test('Errorline', async () => {
      expect(screen.getByTestId('input-date-error')).toBeInTheDocument();
    });
  });
});
