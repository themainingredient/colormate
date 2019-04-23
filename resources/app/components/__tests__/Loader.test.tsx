import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Loader from '../Loader';

jest.mock('../../assets/text1Loader.svg', () => 'text-one-loader');
jest.mock('../../assets/text2Loader.svg', () => 'text-two-loader');

afterEach(cleanup);

describe('Loader.jsx', () => {
  test('renders and displays correctly', () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
