import {omit} from 'lodash';

interface ColorMap {
  [hexColor: string]: InputLayer[]
}

export interface InputLayer {
  id: string;
  name: string;
  type: string;
  colorType: string;
  parents: InputLayerParent[];
}

export interface InputLayerParent {
  id: string;
  name: string;
  type: string;
}

export interface Layer {
  id: string;
  name: string;
  type: string;
  colorType?: string;
  children?: Layer[];
}

interface Color {
  color: string;
  layers: Layer[];
}

export const mapColorMapToColors = (colorsObject: ColorMap): Color[] => {
  return Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    layers: inputLayers.reduce((acc: Layer[], cur: InputLayer) => addLayerWithGrouping(acc, cur), [])
  }));
};

const addLayerWithGrouping = (groupedLayers: Layer[], layerToAdd: InputLayer | Layer): Layer[]  => {
  let layer: Layer = isInputLayerType(layerToAdd) ? mapInputLayerToLayer(layerToAdd) : layerToAdd;

  if (!groupedLayers.length) {
    return [layer];
  }

  const filteredGroupedLayers = groupedLayers.filter(groupedLayer => groupedLayer.name === layer.name)
  if (filteredGroupedLayers.length) {
      return groupedLayers.map(groupedLayer => {
              if ('children' in layer) {
                  // each child layer needs to be added with grouping to the children of the current layer
                  const updatedLayers: Layer[] = layer.children!.reduce((acc: Layer[], cur: Layer) => addLayerWithGrouping(acc, cur), groupedLayer.children!)
                  return {
                      ...groupedLayer,
                      children: updatedLayers
                  }
              } else {
                  // layers have same name and layer to insert has no children: nothing to change 
                  return groupedLayer;
              }
      })
  } 

  return groupedLayers.concat([layer])
}

const mapInputLayerToLayer = (inputLayer: InputLayer): Layer => {
  const hierarchy = getHierarchy(inputLayer);
  return getChild(hierarchy);
} 

const getHierarchy = (inputLayer: InputLayer): Layer[] => {
  if (inputLayer.parents.length) {
    return [...inputLayer.parents, omit(inputLayer, 'parents')];
  }

  return [omit(inputLayer, 'parents')];
};

// there is only one child for each layer in the hierarchy
const getChild = (hierarchy: Layer[]): Layer => {
  if (hierarchy.length === 1) {
    return hierarchy[0];
  }

  return {
    ...hierarchy[0],
    children: [getChild(hierarchy.splice(1))],
  };
};

const isInputLayerType = (layer: InputLayer | Layer): layer is InputLayer => {
  return (<InputLayer>layer).parents !== undefined;
}
