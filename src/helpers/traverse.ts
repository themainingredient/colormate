import { Layer } from './../models/layer.model';
import { getParents } from './get-colors';

export const traverse = (layer: Layer, layers: any[] = [], parents: any[] = []) => {  
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
