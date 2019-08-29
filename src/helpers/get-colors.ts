import {
  Layer, Page, Group, Selection, Fill, Border
} from 'sketch'; // eslint-disable-line import/no-unresolved

export const getParents = (parents: any[], id: { id: string, type: string, name: string }) => [...parents, id];

export const hasBorder = (layer: any): boolean => !!layer.style.borders.filter((border: Border) => border.enabled).length;

export const hasFill = (layer: any): boolean => !!layer.style.fills.filter((fill: Fill) => fill.enabled).length;

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

const mapLayerToPageWithOnlyLayerAcc = (accLayer: Partial<Page> | Partial<Group> | Layer | null, layer: Layer) => {
  let mappedLayer: Partial<Page> | Partial<Group> | Layer;

  if (!accLayer) {
    mappedLayer = layer; // leaf layer is totally preserved in order to keep all the properties (e.g. styles)
  } else {
    // parent layers are mapped to exclude the unselected children
    mappedLayer = {
      id: layer.id,
      type: layer.type,
      name: layer.name,
      layers: [accLayer],
    } as Partial<Page> | Partial<Group>;
  }

  if (layer.parent.type === 'Document') {
    return mappedLayer;
  }

  return mapLayerToPageWithOnlyLayerAcc(mappedLayer, layer.parent as Layer);
};

const mapLayerToPageWithOnlyLayer = (layer: Layer): Partial<Page> => mapLayerToPageWithOnlyLayerAcc(null, layer);

export const getPagesWithSelectedLayers = (selectedLayers: Selection): Page[] => {
  return selectedLayers.layers.map((layer: Layer) => mapLayerToPageWithOnlyLayer(layer)) as Page[];
};
