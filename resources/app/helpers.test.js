import { calcOpacityPercentage, colorsObjectToArray } from './helpers';
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
    test('it transforms a hex color to a relative luminance value', () => {
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

  describe.only('createTreeStructure', () => {
    let input;
    let output;
    afterEach(() => { expect(colorsObjectToArray(input)).toEqual(output); });

    test('transform colors object to an array', () => {
      input = {
        red: [],
        yellow: [],
      };

      output = [
        { color: 'red', layers: [] },
        { color: 'yellow', layers: [] },
      ];
    });

    test('should convert a basic tree', () => {
      input = {
        red: [{
          name: 'Rectangle1',
        }],
      };

      output = [{
        color: 'red',
        layers: [{
          name: 'Rectangle1',
        }],
      }];
    });

    test('should convert a tree with one parent', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [
              { name: 'Rectangle1' },
            ],
          },
        ],
      }];
    });

    test('should convert a tree with 1 layer with 2 parents', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [{
              name: 'Artboard',
              children: [
                { name: 'Rectangle1' },
              ],
            }],
          },
        ],
      }];
    });

    test('should convert a tree with 2 layers with different parents', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }, {
          name: 'Rectangle2',
          parents: [
            { name: 'Page2' },
            { name: 'Artboard2' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [{
              name: 'Artboard',
              children: [
                { name: 'Rectangle1' },
              ],
            }],
          },
          {
            name: 'Page2',
            children: [{
              name: 'Artboard2',
              children: [
                { name: 'Rectangle2' },
              ],
            }],
          },
        ],
      }];
    });

    test.only('should convert a tree with 2 layers with the same parents', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }, {
          name: 'Rectangle2',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [{
              name: 'Artboard',
              children: [
                { name: 'Rectangle1' },
                { name: 'Rectangle2' },
              ],
            }],
          },
        ],
      }];
    });
  });
});
