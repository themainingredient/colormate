import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Header from './Header';

jest.mock('../assets/colormateLogo.svg', () => 'img');

afterEach(cleanup);

describe('Header.jsx', () => {
  test('renders and displays correctly', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
