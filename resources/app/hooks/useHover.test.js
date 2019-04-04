import React from 'react';
import { renderHook, cleanup } from 'react-hooks-testing-library';
import { render, fireEvent } from 'react-testing-library';
import useHover from './useHover';
import Footer from '../components/Footer';

afterEach(cleanup);

jest.mock('../Global.styles', () => ({ colors: [], fonts: { SFPro: { reg: '' } } }));

test('returns false for no document passed', () => {
  const { result } = renderHook(() => useHover());
  expect(result.current[0]).toBe(false);
});

it('expects the button to render done', () => {
  const { container } = render(<Footer />);

  const button = container.querySelector('button');
  expect(button.textContent).toBe('Done');
});

it('it expects the button to render 👍 emoji on mouseOver', () => {
  const { container } = render(<Footer />);

  const button = container.querySelector('button');
  fireEvent.mouseOver(button);
  expect(button.textContent).toBe('👍');
});

it('it expects the button to render done on mouseOut', () => {
  const { container } = render(<Footer />);

  const button = container.querySelector('button');
  fireEvent.mouseOut(button);
  expect(button.textContent).toBe('Done');
});
