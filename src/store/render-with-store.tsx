import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import { RootState } from 'store';
import brainReducer, { BrainState } from './reduxSlice';
import { ReactElement } from 'react';
import React from 'react';

const testStore = (state: Partial<RootState>) => {
  return configureStore({
    reducer: {
      brain: brainReducer,
    },
    preloadedState: state,
  });
};

export const renderWithStore = (
  component: ReactElement,
  initialState: Partial<{ brain: BrainState }>
) => {
  const Wrapper = ({ children }: { children: ReactElement }) => (
    <Provider store={testStore(initialState)}>{children}</Provider>
  );
  return render(component, { wrapper: Wrapper });
};
