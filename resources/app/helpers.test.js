import { getOpacityPercentage } from './helpers';

describe('React | Helpers', () => {
  describe('getOpacityPercentage', () => {
    test('it returns the opacity percentage of a given hex color', () => {
      const color1 = '#ffffffff';
      const color2 = '#C2C2C2C2';

      expect(getOpacityPercentage(color1)).toEqual(100);
      expect(getOpacityPercentage(color2)).toEqual(76);
    });
  });
});
