import { getParents } from './get-colors';

export const traverse = (layer, layers = [], parents = []) => {
  if (('layers' in layer) && layer.layers.length) {
    layer.layers.forEach(subLayers => (
      traverse(subLayers, layers, getParents(parents, { id: layer.id, type: layer.type, name: layer.name }))
    ));
  }

  const layerWithParents = {
    layer,
    parents,
  };

  layers.push(layerWithParents);

  return layers;
};
