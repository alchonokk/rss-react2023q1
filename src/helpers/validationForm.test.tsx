import { FormPage } from 'pages/FormPage';
import React from 'react';
import { BrainState } from 'store/reduxSlice';
import { renderWithStore } from 'store/render-with-store';
import { validateDate } from './validationForm';

describe('validation date', () => {
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
  test('check validateDate', () => {
    expect(validateDate('2023-04-11')).toBe(true);
  });
});
