import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from './component/home/Home';

it('renders test in home page', () => {
  render(<Home />);
  expect(screen.getByText('Welcome to NMT-Blog')).toBeInTheDocument();
});
