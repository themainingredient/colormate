import MockSketchDocument from '../__mocks__/MockSketchDocument';
import { traverse } from './traverse';

describe('Helpers / traverse', () => {
  let layers;

  beforeEach(() => {
    layers = traverse(MockSketchDocument.pages[0]);
  });
  test('it should return an array with all the layers of the given input', () => {
    expect(layers.length).toEqual(16);
  });

  test('it should add the parental array to the layers', () => {
    expect(layers[0]).toHaveProperty('layer');
    expect(layers[0]).toHaveProperty('parents');
  });
});
