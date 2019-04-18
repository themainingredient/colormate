import { getParents } from './get-colors';

//TODO: move
export interface Layer {
  type: string;
  id: string;
  frame: {x: number; y: number; width: number; height: number; };
  name: string;
  selected: boolean;
  sharedStyleId: string | null;
  layers?: (Layer & any)[]
}

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
