import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Footer from '../Footer';
import { closeWindow, openUrlInBrowser } from '../../helpers/window';

jest.mock('../../helpers/window', () => {
  return {
    closeWindow: jest.fn(),
    openUrlInBrowser: jest.fn(),
  };
});

afterEach(cleanup);

describe('Footer.jsx', () => {
  test('renders and displays correctly', () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls the closeWindow function when the done button is clicked', () => {
    const { getByText } = render(<Footer />);
    const doneButton = getByText('Done');

    fireEvent.click(doneButton);

    expect(closeWindow).toHaveBeenCalled();
  });

  test('calls the openUrlInBrowser function with the TMI website when MadeBy is clicked', () => {
    const { getByText } = render(<Footer />);
    const madeByButton = getByText('Made by');

    fireEvent.click(madeByButton);

    expect(openUrlInBrowser).toHaveBeenCalled();
    expect(openUrlInBrowser).toHaveBeenCalledWith('https://www.themainingredient.co');
  });
});
