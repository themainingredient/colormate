import { closeWindow, openUrlInBrowser } from './window';
import { tmiUrl } from '../constants';

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
    openUrlInBrowser(tmiUrl);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('openUrlInBrowser', tmiUrl);
  });
});
