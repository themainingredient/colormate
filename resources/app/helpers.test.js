import * as fromHelpers from './helpers';

describe('React | Helpers', () => {
  describe('calcOpacityPercentage', () => {
    test('it returns the opacity percentage of a given hex color', () => {
      const color1 = '#ffffffff';
      const color2 = '#C2C2C2C2';

      expect(fromHelpers.calcOpacityPercentage(color1)).toEqual(100);
      expect(fromHelpers.calcOpacityPercentage(color2)).toEqual(76);
    });
  });

  describe('calculateCombinedLuminance', () => {
    test.skip('it transforms a hex color to a relative luminance value', () => {
      const originalImplementation = fromHelpers.calculateLuminance;
      fromHelpers.calculateLuminance = jest.fn()
        .mockReturnValueOnce(0.730)
        .mockReturnValueOnce(0.056)
        .mockReturnValueOnce(0.246);

      expect(Number(fromHelpers.calculateCombinedLuminance('RANDOMVALUE').toFixed(4))).toEqual(0.213);
      fromHelpers.calculateLuminance = originalImplementation;
    });
  });

  describe('calculateLuminance', () => {
    test('it calculates the luminance of a single Hex', () => {
      expect(Number(fromHelpers.calculateLuminance('FF').toFixed(4))).toEqual(1);
      expect(Number(fromHelpers.calculateLuminance('AA').toFixed(4))).toEqual(0.4020);
      expect(Number(fromHelpers.calculateLuminance('11').toFixed(4))).toEqual(0.0056);
      expect(Number(fromHelpers.calculateLuminance('00').toFixed(4))).toEqual(0);
    });
  });

  describe('calculateContrast', () => {
    test('it returns the luminance of a color', () => {
      const color1 = '#EEEEEEFF';
      const color2 = '#DE438FFF';

      expect(fromHelpers.calculateContrast(color1)).toEqual(1.16);
      expect(fromHelpers.calculateContrast(color2)).toEqual(3.96);
    });
  });

  describe('closeWindow', () => {
    let spy;
    test('it posts a closeWindow message', () => {
      spy = jest.spyOn(window, 'postMessage').mockImplementation(() => {});

      fromHelpers.closeWindow();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('closeWindow');
    });

    afterEach(() => {
      spy.mockRestore();
    });
  });
});
