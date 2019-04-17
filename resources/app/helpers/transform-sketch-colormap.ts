import { omit } from 'lodash';
import { Layer } from '../models/color-with-layers.model';
import { ColorWithLayers } from '../models/color-with-layers.model';
import { SketchColorMap, SketchColorMapLayer } from '../models/sketch-color-map.model';

export const transformSketchColorMap = (colorsObject: SketchColorMap): ColorWithLayers[] => {
  return Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    layers: inputLayers.reduce((acc: Layer[], cur: SketchColorMapLayer) => addLayerWithGrouping(acc, cur), []),
  }));
};

const addLayerWithGrouping = (groupedLayers: Layer[] = [], layerToAdd: SketchColorMapLayer | Layer): Layer[] => {
  let layer: Layer = isSketchColorMapLayerType(layerToAdd) ? mapInputLayerToLayer(layerToAdd) : layerToAdd;

  if (!groupedLayers.length) {
    return [layer];
  }

  const filteredGroupedLayers = groupedLayers.filter(groupedLayer => groupedLayer.name === layer.name);
  if (filteredGroupedLayers.length) {
    return groupedLayers.map(groupedLayer => {
      if (groupedLayer.name === layer.name && 'children' in layer) {
        // each child layer needs to be added with grouping to the children of the current layer
        const updatedLayers: Layer[] = layer.children!.reduce(
          (acc: Layer[], cur: Layer) => addLayerWithGrouping(acc, cur),
          groupedLayer.children!,
        );
        return {
          ...groupedLayer,
          children: updatedLayers,
        };
      } else {
        // layers have different name or layer to insert has no children: nothing to change for the current grouped layer
        return groupedLayer;
      }
    });
  }

  return groupedLayers.concat([layer]);
};

const mapInputLayerToLayer = (inputLayer: SketchColorMapLayer): Layer => {
  const hierarchy = getHierarchy(inputLayer);
  return getChild(hierarchy);
};

const getHierarchy = (inputLayer: SketchColorMapLayer): Layer[] => {
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

const isSketchColorMapLayerType = (layer: SketchColorMapLayer | Layer): layer is SketchColorMapLayer => {
  return (<SketchColorMapLayer>layer).parents !== undefined;
};
