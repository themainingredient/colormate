interface ColorMap {
  [hexColor: string]: InputLayer[]
}

interface InputLayer {
  name: string;
  parents?: {name: string}[];
}

interface Layer {
  name: string;
  children?: Layer[];
}

interface Color {
  color: string;
  layers: Layer[];
}

const getHierarchy = (layer: InputLayer): Layer[] => {
  if ('parents' in layer && layer.parents!.length) {
    return [...layer.parents, { name: layer.name }];
  }

  return [{ name: layer.name }];
};

const getLayers = (hierarchy: { name: string }[]): Layer => {
  if (hierarchy.length === 1) {
    return hierarchy[0];
  }

  return {
    name: hierarchy[0].name,
    children: [getLayers(hierarchy.splice(1))],
  };
};

export const mapColorMapToColors = (colorsObject: ColorMap): Color[] => {
  return Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    layers: inputLayers
      .map((inputLayer: InputLayer) => {
        const hierarchy = getHierarchy(inputLayer);
        const returnObj = getLayers(hierarchy);

        return returnObj;
      })
      .reduce((acc: Layer[], cur: Layer) => addLayerWithGrouping(acc, cur), [])
  }));
};

const addLayerWithGrouping = (groupedLayers: Layer[], layer: Layer): Layer[]  => {
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
                      name: groupedLayer.name,
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
