
import * as fromCalculations from './calculations.ts';

describe('React | Helpers', () => {
  describe('calcOpacityPercentage', () => {
    test('it returns the opacity percentage of a given hex color', () => {
      const color1 = '#ffffffff';
      const color2 = '#C2C2C2C2';

      expect(fromCalculations.calcOpacityPercentage(color1)).toEqual(100);
      expect(fromCalculations.calcOpacityPercentage(color2)).toEqual(76);
    });
  });

  describe('calculateCombinedLuminance', () => {
    test('it transforms a hex color to a relative luminance value', () => {
      const originalImplementation = fromCalculations.calculateLuminance;
      fromCalculations.calculateLuminance = jest.fn()
        .mockReturnValueOnce(0.730)
        .mockReturnValueOnce(0.056)
        .mockReturnValueOnce(0.246);

      expect(Number(fromCalculations.calculateCombinedLuminance('RANDOMVALUE').toFixed(4))).toEqual(0.213);
      fromCalculations.calculateLuminance = originalImplementation;
    });
  });

  describe('calculateLuminance', () => {
    test('it calculates the luminance of a single Hex', () => {
      expect(Number(fromCalculations.calculateLuminance('FF').toFixed(4))).toEqual(1);
      expect(Number(fromCalculations.calculateLuminance('AA').toFixed(4))).toEqual(0.4020);
      expect(Number(fromCalculations.calculateLuminance('11').toFixed(4))).toEqual(0.0056);
      expect(Number(fromCalculations.calculateLuminance('00').toFixed(4))).toEqual(0);
    });
  });

  describe('calculateContrast', () => {
    test('it returns the luminance of a color', () => {
      const color1 = '#EEEEEEFF';
      const color2 = '#DE438FFF';

      expect(fromCalculations.calculateContrast(color1)).toEqual(1.16);
      expect(fromCalculations.calculateContrast(color2)).toEqual(3.96);
    });
  });
});
