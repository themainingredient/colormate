export const getParents = (parents: any[], id: { id: string, type: string, name: string }) => [...parents, id];

export const hasBorder = (layer: any) => !!layer.style.borders.length;

export const hasFill = (layer: any) => !!layer.style.fills.length;

export const hasTextColor = (layer: any) => !!layer.style.textColor;

export const createDataStructure = (layer: any, colorType: any, parents: any) => ({
  id: layer.id,
  name: layer.name,
  type: layer.type,
  colorType,
  parents,
});

export const getColorArray = (colorsObject: any, color: any, dataStructure: any) => (
  colorsObject[color] ? [...colorsObject[color], dataStructure] : [dataStructure]
);
