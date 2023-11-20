import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UX AI logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText('i');
  expect(logoElement).toBeInTheDocument();
});

test('renders beta version text', () => {
  render(<App />);
  const versionElement = screen.getByText('Beta V.02');
  expect(versionElement).toBeInTheDocument();
});

// Modify or add additional tests as needed for specific elements or functionalities
