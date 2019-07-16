import { Page } from 'sketch'; // eslint-disable-line import/no-unresolved
import MockSketchDocument from '../__mocks__/MockSketchDocument.json';
import { traverse } from './traverse';

describe('Helpers / traverse', () => {
  let layers: any[];

  beforeEach(() => {
    layers = traverse(MockSketchDocument.pages[0] as unknown as Page);
  });
  test('it should return an array with all the layers of the given input', () => {
    expect(layers.length).toEqual(16);
  });

  test('it should add the parental array to the layers', () => {
    expect(layers[0]).toHaveProperty('layer');
    expect(layers[0]).toHaveProperty('parents');
  });
});
