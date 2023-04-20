import React from 'react';
import { renderWithStore } from 'store/render-with-store';
import { act, fireEvent, screen } from '@testing-library/react';
import { SearchBox } from '.';
import { BrainState } from 'store/reduxSlice';
import axios from 'axios';

jest.mock('axios');

describe('Default cards from api', () => {
  const customInitialState: Partial<{ brain: BrainState }> = {
    brain: {
      valueApi: { status: '', totalResults: 0, articles: [] },
      status: 'idle',
      valueSearch: '',
      infoFromForm: [],
    },
  };
  beforeEach(async () => {
    renderWithStore(<SearchBox />, customInitialState);
  });
  test('Default api', async () => {
    expect(axios.get).toHaveBeenCalledWith(
      'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f5110220c7f6448d84d3250bb882da25'
    );
  });
  test('to be card-block ', async () => {
    expect(screen.getByTestId('api-card-block')).toBeInTheDocument();
  });
});

describe('empty article', () => {
  const customInitialState: Partial<{ brain: BrainState }> = {
    brain: {
      valueApi: { status: '', totalResults: 0, articles: [] },
      status: 'idle',
      valueSearch: 'apple',
      infoFromForm: [],
    },
  };
  beforeEach(async () => {
    renderWithStore(<SearchBox />, customInitialState);
  });
  test('to be text error ', async () => {
    await act(async () => {
      fireEvent.submit(screen.getByTestId('input-submit'));
    });
    expect(screen.getByTestId('text-error')).toBeInTheDocument();
  });
});
