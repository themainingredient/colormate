import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Footer from './Footer';

afterEach(cleanup);

describe('Footer.jsx', () => {
  test('renders and displays correctly', () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
