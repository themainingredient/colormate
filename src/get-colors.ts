// eslint-disable-next-line import/no-unresolved
import sketch, { Document } from 'sketch';
import { traverse } from './helpers/traverse';
import {
  hasBorder,
  hasFill,
  hasTextColor,
  createDataStructure,
  getColorArray,
} from './helpers/get-colors';

const isSelectionActive = (selectedDocument: Document) => {
  const selectedLayers = selectedDocument.selectedLayers;
  return !!selectedLayers.length;
}

// from selectedLayers construct the page with only selected layers
const getSelectedPages = (selectedDocument: Document) => {
  return selectedDocument.pages; //TODO: implement
}

export default function () {
  const colorsObject = {};
  const selectedDocument = sketch.getSelectedDocument();
  const documentPages = isSelectionActive(selectedDocument) ? getSelectedPages(selectedDocument) : selectedDocument.pages;

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
