import { Page, Layer } from 'sketch'; // eslint-disable-line import/no-unresolved
import { getParents } from './get-colors';

export const traverse = (layer: Page | Layer, layers: any[] = [], parents: any[] = []): any => {
  if (('layers' in layer) && layer.layers!.length) {
    layer.layers!.forEach((subLayer: any) => (
      traverse(subLayer, layers, getParents(parents, { id: layer.id, type: layer.type, name: layer.name }))
    ));
  }

  const layerWithParents = {
    layer,
    parents,
  };

  layers.push(layerWithParents);

  return layers;
};
