import { Page, Selection } from 'sketch';
// eslint-disable-next-line import/no-unresolved
import sketch from 'sketch';
import { traverse } from './helpers/traverse';
import {
  hasBorder,
  hasFill,
  hasTextColor,
  createDataStructure,
  getColorArray,
  getPagesWithSelectedLayers,
} from './helpers/get-colors';

export default function () {
  const colorsObject = {};
  const selectedDocument = sketch.getSelectedDocument();
  const selectedLayers: Selection = selectedDocument.selectedLayers;

  const documentPages: Page[] = selectedLayers.isEmpty ? 
    selectedDocument.pages : 
    getPagesWithSelectedLayers(selectedLayers);

  const traversedPages: any[] = [];

  documentPages.forEach((page) => {
    const traversedPage = traverse(page);
    traversedPages.push(traversedPage);
  });

  traversedPages.forEach((pageWithLayers: any[]) => {
    pageWithLayers.forEach((layerWithParents) => {
      const { layer, parents } = layerWithParents;

      if ('style' in layer) {
        if (hasBorder(layer)) {
          const { color } = layer.style.borders[0];

          const dataStructure = createDataStructure(layer, 'border', parents);
          colorsObject[color] = getColorArray(colorsObject, color, dataStructure);
        }

        if (hasFill(layer)) {
          const { color } = layer.style.fills[0];

          const dataStructure = createDataStructure(layer, 'fill', parents);
          colorsObject[color] = getColorArray(colorsObject, color, dataStructure);
        }

        if (hasTextColor(layer)) {
          const color = layer.style.textColor;

          const dataStructure = createDataStructure(layer, 'text', parents);
          colorsObject[color] = getColorArray(colorsObject, color, dataStructure);
        }
      }
    });
  });

  const orderedColorsObject = {};

  Object.keys(colorsObject)
    .sort()
    .reverse()
    .forEach((key) => {
      orderedColorsObject[key] = colorsObject[key];
    });

  return orderedColorsObject;
}