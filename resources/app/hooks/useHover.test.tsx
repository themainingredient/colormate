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

describe('Button', () => {
  let button: any;
  beforeEach(() => {
    const { container } = render(<Footer />);

    button = container.querySelector('button');
  });

  it('expects the button to render done', () => {
    expect(button.textContent).toBe('Done');
  });

  it('it expects the button to render 👍 emoji on mouseOver', () => {
    fireEvent.mouseOver(button);

    expect(button.textContent).toBe('👍');
  });

  it('it expects the button to render done on mouseOut', () => {
    fireEvent.mouseOut(button);

    expect(button.textContent).toBe('Done');
  });
});
