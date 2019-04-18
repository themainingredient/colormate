import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Button from './Button';
import Globals from '../Global.styles';

const { colors } = Globals;

afterEach(cleanup);

describe('Button.jsx', () => {
  test('renders and displays correctly', () => {
    const { getByText } = render(<Button>TestButton</Button>);
    const renderedButton = getByText('TestButton');

    expect(renderedButton).toHaveTextContent('TestButton');
    expect(renderedButton).toHaveStyle(`background-color: ${colors.TMIBlue}`);
  });
});
