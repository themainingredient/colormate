import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import NoColorsFound from '../NoColorsFound';
import { closeWindow } from '../../helpers/window'; 

jest.mock('../../assets/minimilistBubbles.svg', () => 'bubbles-img');
jest.mock('../../helpers/window.ts', () => {

  return {
    closeWindow: jest.fn(),
  };
});

afterEach(cleanup);
afterAll(() => (closeWindow as jest.Mock).mockReset());

describe('NoColorsFound.jsx', () => {
  test('renders and displays correctly', () => {
    const { container } = render(<NoColorsFound />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('closes the window when the close button is clicked', () => {
    const { getByText } = render(<NoColorsFound />);
    const closeButton = getByText('Close');

    fireEvent.click(closeButton);

    expect(closeWindow).toHaveBeenCalled();
  });
});
