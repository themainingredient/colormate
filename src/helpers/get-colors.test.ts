import MockLayer from '../__mocks__/MockLayer.json';
import MockTextLayer from '../__mocks__/MockTextLayer.json';
import {
  getParents,
  hasBorder,
  hasFill,
  createDataStructure,
  getColorArray,
  hasTextColor,
  getPagesWithSelectedLayers,
} from './get-colors';
import { ColorType } from '../../enums/color-type.enum';

describe('Helpers / get-colors', () => {
  test('getParents returns an array of the parents and the current layer id', () => {
    const parents = ['grandfatherID', 'motherID'];
    const currentLayer = { id: 'foo', type: 'foo', name: 'foo' };
    const expectedParentsArray = [...parents, currentLayer];
    const parentsArray = getParents(parents, currentLayer);

    expect(parentsArray).toEqual(expectedParentsArray);
  });

  describe('hasBorder', () => {
    test('returns true if the layer has a border', () => {
      expect(hasBorder(MockLayer)).toBeTruthy();
    });

    test('returns false if the layer has no border', () => {
      const UnborderedMockLayer = {
        ...MockLayer,
        style: {
          ...MockLayer.style,
          borders: [],
        },
      };

      expect(hasBorder(UnborderedMockLayer)).toBeFalsy();
    });
  });

  describe('hasFill', () => {
    test('returns true if the layer has a fill', () => {
      expect(hasFill(MockLayer)).toBeTruthy();
    });

    test('returns false if the layer has no fill', () => {
      const UnfilledMockLayer = {
        ...MockLayer,
        style: {
          ...MockLayer.style,
          fills: [],
        },
      };

      expect(hasFill(UnfilledMockLayer)).toBeFalsy();
    });
  });

  describe('hasTextColor', () => {
    test('returns true if the layer has a textColor', () => {
      expect(hasTextColor(MockTextLayer)).toBeTruthy();
    });

    test('returns false if the layer has no text color', () => {
      const UncoloredTextLayer = {
        ...MockTextLayer,
        style: {
          ...MockTextLayer.style,
          textColor: '',
        },
      };

      expect(hasTextColor(UncoloredTextLayer)).toBeFalsy();
    });
  });

  test('createDataStructure returns an object containing layer.id as id, colorType and parents', () => {
    const layer = { id: 'imalayer' };
    const colorType = ColorType.border;
    const parents = ['id1', 'id2'];
    const dataStructure = createDataStructure(layer, colorType, parents);

    expect(dataStructure).toEqual({ id: layer.id, colorType, parents });
  });

  describe('getColorArray', () => {
    let colorsObject: any;
    let includedColor: any;
    let excludedColor: any;
    let includedColorArray: any;
    let dataStructureValue: any;

    beforeEach(() => {
      includedColor = '#123456';
      excludedColor = '#ABCDEF';
      includedColorArray = ['datastructure1', 'datastructure2'];
      dataStructureValue = 'datastructure3';
      colorsObject = { [includedColor]: includedColorArray };
    });

    test('adds the datastructure to an already existing colorArray', () => {
      const colorArray = getColorArray(colorsObject, includedColor, dataStructureValue);

      expect(colorArray).toEqual([...includedColorArray, dataStructureValue]);
    });

    test('creates a new key value with the given color as key and the given datastructure as value in an array', () => {
      const colorArray = getColorArray(colorsObject, excludedColor, dataStructureValue);
      const expectedColorsObject = [dataStructureValue];

      expect(colorArray).toEqual(expectedColorsObject);
    });
  });

  describe('getPagesWithSelectedLayers', () => {
    test('should map the layers to pages with only the selected layers, preserving the layer itself', () => {
      const layer = {
        id: 'Rectangle',
        name: 'Rectangle',
        type: 'ShapePath',
        style: {},
        parent: {
          id: 'Group',
          name: 'Group',
          type: 'Group',
          parent: {
            id: 'Page',
            name: 'Page',
            type: 'Page',
            parent: {
              name: 'Document', type: 'Document',
            },
          },
        },
      };
      const input: any = {
        layers: [layer],
      };

      const output = [{
        id: 'Page',
        name: 'Page',
        type: 'Page',
        layers: [{
          id: 'Group',
          name: 'Group',
          type: 'Group',
          layers: [layer],
        }],
      }];

      expect(getPagesWithSelectedLayers(input)).toEqual(output);
    });
  });
});
