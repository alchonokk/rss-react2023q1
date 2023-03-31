import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormPage } from 'pages/FormPage';
import React from 'react';

describe('RenderForm', () => {
  window.URL.createObjectURL = jest.fn();
  beforeEach(() => {
    render(<FormPage />);
  });
  test('renders FormsPage', () => {
    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });

  describe('Input-name', () => {
    test('Input Event', () => {
      const inputElement = screen.getByTestId('input-name');
      act(() => {
        userEvent.type(inputElement, 'te');
      });
      act(() => {
        fireEvent.submit(screen.getByTestId('submit'));
      });
      expect(screen.getByDisplayValue('te')).toBeInTheDocument();
    });
  });
});
