import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from '.';

describe('inputBox', () => {
  let unmount: () => void;
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
    const renderResult = render(<SearchBox />);
    unmount = renderResult.unmount;
  });

  test('input', () => {
    const inputElement = screen.getByPlaceholderText(/Search/i);
    expect(inputElement).toBeInTheDocument();
  });

  describe('LocalStorage dataInputBox', () => {
    test('localInput Event', () => {
      const inputElement = screen.getByPlaceholderText(/Search/i);
      act(() => {
        userEvent.type(inputElement, 'testing');
      });
      unmount();
      expect(window.localStorage.setItem).toHaveBeenCalledWith('searchData', 'testing');
    });

    test('localInput unmount', () => {
      unmount();
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
