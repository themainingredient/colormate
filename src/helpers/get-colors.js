export const getParents = (parents, id) => [...parents, id];

export const hasBorder = layer => !!layer.style.borders.length;

export const hasFill = layer => !!layer.style.fills.length;

export const createDataStructure = (layer, colorType, parents) => ({
  id: layer.id,
  colorType,
  parents,
});

export const getColorArray = (colorsObject, color, dataStructure) => (
  colorsObject[color] ? [...colorsObject[color], dataStructure] : [dataStructure]
);
