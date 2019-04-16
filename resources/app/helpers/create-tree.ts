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
    return [
      ...layer.parents,
      { name: layer.name },
    ];
  }

  return [{ name: layer.name }];
};

const getLayers = (hierarchy: {name: string}[]): Layer => {
    if (hierarchy.length === 1) {
      return hierarchy[0];
    }
  
    return ({
      name: hierarchy[0].name,
      children: [getLayers(hierarchy.splice(1))],
    });
};

export const mapColorMapToColors = (colorsObject: ColorMap): Color[] => {
  const colors = Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    layers: inputLayers.map((inputLayer) => {
      const hierarchy = getHierarchy(inputLayer);
      const returnObj = getLayers(hierarchy);

      return returnObj;
    }),
  }));

  const colorsWithGroupedLayers: Color[] = colors.map(color => {
    return {
      ...color,
      layers: groupLayers([], color.layers)
    }
  })

  return colorsWithGroupedLayers;
};

const groupLayers = (groupedLayers: Layer[], remainingLayers: Layer[]): Layer[] => {
  if (!remainingLayers.length) {
      return groupedLayers;
  }

  return groupLayers(
      addLayer(groupedLayers, remainingLayers[0]), 
      remainingLayers.slice(1)
  );
}
const addLayer = (groupedLayers: Layer[], layer: Layer) => {
  if (!groupedLayers.length) {
      return [layer];
  }

  const filteredGroupedLayers = groupedLayers.filter(groupedLayer => groupedLayer.name === layer.name)
  if (filteredGroupedLayers.length) {
      return groupedLayers.map(groupedLayer => {
              if ('children' in layer) {

                  let updatedLayers: Layer[] = [];
                  layer!.children.forEach(child => {
                      updatedLayers = addLayer(groupedLayer!.children, child);
                  })

                  return {
                      name: groupedLayer.name,
                      children: updatedLayers
                  }

              } else {
                  //nothing to change: layers have same name and layer to insert has no children
                  return groupedLayer;
              }
      })
  } else {
      return groupedLayers.concat([layer]);
  }
}
