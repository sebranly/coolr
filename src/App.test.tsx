import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Coolr/i);
  expect(linkElement).toBeInTheDocument();
});
