import { closeWindow, openUrlInBrowser } from './window';

describe('closeWindow', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(window, 'postMessage').mockImplementation(() => {});
  });

  test('it posts a closeWindow message', () => {
    closeWindow();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('closeWindow');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('it posts a openUrlInBrowser message with URL', () => {
    const url = 'url';
    openUrlInBrowser(url);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('openUrlInBrowser', url);
  });
});
