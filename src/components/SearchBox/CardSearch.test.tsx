import { act, fireEvent, render, screen } from '@testing-library/react';
import { CardFromSearch } from './CardFromSearch';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { SearchBox } from '.';
import React from 'react';
jest.mock('axios');

const articles = [
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

describe('Cards from api', () => {
  describe('Mock api', () => {
    beforeEach(async () => {
      render(<SearchBox />);
      const inputElement = screen.getByTestId('input');
      await act(() => {
        userEvent.type(inputElement, 'Dress');
      });
      await act(() => {
        fireEvent.submit(screen.getByTestId('input-submit'));
      });
      (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: { articles } })
      );
    });
    test('Fetch resolve', async () => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://newsapi.org/v2/everything?q=Dress&sources=bbc-news&searchIn=title&from=2023-03-20&sortBy=popularity&apiKey=f5110220c7f6448d84d3250bb882da25'
      );
    });

    describe('Fetch resolve and render card', () => {
      beforeEach(async () => {
        render(<CardFromSearch {...articles[0]} />);
      });

      test('Check length', async () => {
        const cardsTitle = screen.getAllByTestId('title');
        expect(cardsTitle).toHaveLength(1);
      });

      test('Check context', async () => {
        const cardElement = screen.getByText(/dressage/i);
        expect(cardElement).toBeInTheDocument();
      });
    });
  });

  describe('CardsBox', () => {
    beforeEach(() => {
      render(
        <CardFromSearch
          author={'My'}
          content={''}
          description={''}
          publishedAt={''}
          title={'apple'}
          url={''}
          urlToImage={'https://hello.com/fake.png'}
        />
      );
    });

    test('IsModal', () => {
      act(() => {
        fireEvent.click(screen.getByTestId('api-card'));
      });
      const cardOfModal = screen.getByTestId('link-news');
      expect(cardOfModal).toBeInTheDocument();
      act(() => {
        fireEvent.click(screen.getByTestId('close-modal'));
      });
      expect(cardOfModal).not.toBeInTheDocument();
    });

    test('contexOfTitle', () => {
      const cardElement = screen.getByText(/apple/i);
      expect(cardElement).toBeInTheDocument();
    });

    test('IscardImage', () => {
      const cards = screen.getAllByTestId('cardImage');
      cards.map((card) => expect(card.querySelector('img')).toBeDefined());
    });

    test('IsTitle', () => {
      const cards = screen.getAllByTestId('title');
      cards.map((card) => expect(card.querySelector('h3')).toBeDefined());
    });
    test('IsDate', () => {
      const cards = screen.getAllByTestId('date-card-search');
      cards.map((card) => expect(card.querySelector('p')).toBeDefined());
    });

    test('IsError', () => {
      const img = screen.getByAltText('img picture');
      fireEvent.error(img);
      expect(img).toHaveAttribute('src', 'https://imgholder.ru/323x300/9dbf16/fff&text=image');
    });
  });
});

describe('without urlImage', () => {
  beforeEach(() => {
    render(
      <CardFromSearch
        author={'My'}
        content={''}
        description={''}
        publishedAt={''}
        title={'apple'}
        url={''}
        urlToImage={''}
      />
    );
  });

  test('withoutCardImage', () => {
    expect(screen.getByTestId('withoutCardImage')).toBeInTheDocument();
  });
});
