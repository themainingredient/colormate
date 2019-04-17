interface ColorMap {
  [hexColor: string]: InputLayer[];
}

export interface InputLayer {
  id: string;
  name: string;
  type: string;
  colorType?: string;
  parents: InputLayer[];
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
  children: Layer[];
}

export const mapColorMapToColors = (colorsObject: ColorMap): Color[] => {
  return Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    children: inputLayers.reduce((acc: Layer[], cur: InputLayer) => addLayerWithGrouping(acc, cur), []),
  }));
};

const addLayerWithGrouping = (groupedLayers: Layer[] = [], layerToAdd: InputLayer | Layer): Layer[] => {
  let layer: Layer = isInputLayerType(layerToAdd) ? mapInputLayerToLayer(layerToAdd) : layerToAdd;

  if (!groupedLayers.length) {
    return [layer];
  }

  const filteredGroupedLayers = groupedLayers.filter(groupedLayer => groupedLayer.name === layer.name);
  if (filteredGroupedLayers.length) {
    return groupedLayers.map(groupedLayer => {
      if ('children' in layer) {
        // each child layer needs to be added with grouping to the children of the current layer
        const updatedLayers: Layer[] = layer.children!.reduce(
          (acc: Layer[], cur: Layer) => addLayerWithGrouping(acc, cur),
          groupedLayer.children!,
        );
        return {
          id: groupedLayer.id,
          type: groupedLayer.type,
          name: groupedLayer.name,
          children: updatedLayers,
        };
      } else {
        // layers have same name and layer to insert has no children: nothing to change
        return groupedLayer;
      }
    });
  }

  return groupedLayers.concat([layer]);
};

const mapInputLayerToLayer = (inputLayer: InputLayer): Layer => {
  const hierarchy = getHierarchy(inputLayer);
  return getLayers(hierarchy);
};

const getHierarchy = (inputLayer: InputLayer): Layer[] => {
  if (inputLayer.parents.length) {
    return [...inputLayer.parents, doMapping(inputLayer)];
  }

  return [doMapping(inputLayer)];
};

//TODO: rename
const doMapping = (inputLayer: InputLayer): Layer => {
  const temp = {
    id: inputLayer.id,
    name: inputLayer.name,
    type: inputLayer.type,
  };

  if ('colorType' in inputLayer) {
    return {
      ...temp,
      colorType: inputLayer.colorType,
    };
  }

  return temp;
};

const getLayers = (hierarchy: Layer[]): Layer => {
  if (hierarchy.length === 1) {
    return hierarchy[0];
  }

  return {
    ...hierarchy[0],
    children: [getLayers(hierarchy.splice(1))],
  };
};

const isInputLayerType = (layer: InputLayer | Layer): layer is InputLayer => {
  return (<InputLayer>layer).parents !== undefined;
};
