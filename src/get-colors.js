import sketch from 'sketch';
import { traverse } from './helpers/traverse';
import {
  hasBorder,
  hasFill,
  createDataStructure,
  getColorArray,
} from './helpers/get-colors';

export default function () {
  const colorsObject = {};
  const documentPages = sketch.getSelectedDocument().pages;

  const traversedPages = [];

  documentPages.forEach((page) => {
    const traversedPage = traverse(page);
    traversedPages.push(traversedPage);
  });

  traversedPages.forEach((pageWithLayers) => {
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
      }
    });
  });

  console.log(JSON.stringify(traversedPages, null, 2));
  return colorsObject;
}
