import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBox } from '.';
import axios from 'axios';
jest.mock('axios');

describe('inputBox', () => {
  beforeEach(async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    const renderResult = render(<SearchBox />);
    renderResult;
  });

  test('localStorage after submit', async () => {
    const inputElement = screen.getByTestId('input');
    await act(() => {
      userEvent.type(inputElement, 'testing');
    });
    await act(() => {
      fireEvent.submit(screen.getByTestId('input-submit'));
    });
    expect(window.localStorage.setItem).toHaveBeenCalledWith('searchData', 'testing');
  });
});

let articles = [
  {
    author: 'Remy Tumin',
    content: 'Kanarek ',
    description: 'Michael Barisone, an Olympic equestrian coach',
    publishedAt: '2023-04-03T22:04:40Z',
    source: { id: 'ff', name: 'New York Times' },
    title: 'Dressage Coach Acquitted of Shooting Student by Reason of Insanity',
    url: 'https://www.nytimes.com/ty.html',
    urlToImage: 'https://000static01.nyt.com/images/',
  },
  {
    author: 'Remy',
    content: 'Ka ',
    description: 'Michael',
    publishedAt: '2023-04-03T22:04:40Z',
    source: { id: 'gg', name: 'New York Times' },
    title: 'Dress',
    url: 'https://www.nytimes.com/111',
    urlToImage: 'https://1111static01.nyt.com/images/',
  },
];

describe('Default cards from api', () => {
  describe('Default Mock api', () => {
    beforeEach(async () => {
      render(<SearchBox />);
      await (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: { articles } })
      );
    });
    test('Default api', async () => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f5110220c7f6448d84d3250bb882da25'
      );
    });
  });
});

articles = [];

describe('empty articles', () => {
  describe('check', () => {
    beforeEach(async () => {
      render(<SearchBox />);
      await (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: { articles } })
      );
    });
    test('text-error', async () => {
      expect(screen.getByTestId('text-error')).toBeInTheDocument();
    });
  });
});
