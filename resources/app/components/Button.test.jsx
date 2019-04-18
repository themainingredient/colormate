import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Button from './Button';
import Globals from '../Global.styles';

const { colors } = Globals;

afterEach(cleanup);

describe('Button.jsx', () => {
  test('renders and displays correctly', () => {
    const clickMock = jest.fn();
    const { getByText } = render(<Button onClick={() => clickMock()}>TestButton</Button>);
    const renderedButton = getByText('TestButton');

    fireEvent.click(renderedButton);

    expect(clickMock).toHaveBeenCalled();
    expect(renderedButton).toHaveTextContent('TestButton');
    expect(renderedButton).toHaveStyle(`background-color: ${colors.TMIBlue}`);
  });
});
