import sketch from 'sketch';

const colors = [];

const traverse = (layer) => {
  if (('layers' in layer) && layer.layers.length) {
    layer.layers.forEach(subLayers => traverse(subLayers));
  }

  // TODO: Make a function for this
  if (layer.style.fills.length) {
    colors.push(layer.style.fills[0].color);
  }

  if (layer.style.borders.length) {
    colors.push(layer.style.borders[0].color);
  }
};

export default function () {
  traverse(sketch.getSelectedDocument().pages[0]);

  return colors;
}
