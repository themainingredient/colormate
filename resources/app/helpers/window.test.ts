import { closeWindow } from './window';

describe('closeWindow', () => {
    let spy: jest.SpyInstance;

    test('it posts a closeWindow message', () => {
      spy = jest.spyOn(window, 'postMessage').mockImplementation(() => {});

      closeWindow();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('closeWindow', '*');
    });

    afterEach(() => {
      spy.mockRestore();
    });
});