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
  // TODO: Make this work for all pages
  const layers = traverse(sketch.getSelectedDocument().pages[0]);

  layers.forEach((layerWithParents) => {
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

  return colorsObject;
}
