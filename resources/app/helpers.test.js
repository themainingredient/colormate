import { calcOpacityPercentage, calculateContrast } from './helpers';

describe('React | Helpers', () => {
  describe('calcOpacityPercentage', () => {
    test('it returns the opacity percentage of a given hex color', () => {
      const color1 = '#ffffffff';
      const color2 = '#C2C2C2C2';

      expect(calcOpacityPercentage(color1)).toEqual(100);
      expect(calcOpacityPercentage(color2)).toEqual(76);
    });
  });

  describe('calculateContrast', () => {
    test('it returns the luminance of a color', () => {
      const color1 = '#EEEEEEFF';
      const color2 = '#DE438FFF';

      expect(calculateContrast(color1)).toEqual(1.16);
      expect(calculateContrast(color2)).toEqual(3.96);
    });
  });
});
