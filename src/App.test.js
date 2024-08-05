// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Spend Savvy header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Spend Savvy/i);
  expect(headerElement).toBeInTheDocument();
});
