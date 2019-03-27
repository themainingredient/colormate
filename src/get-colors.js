import sketch from 'sketch';

const _colors = {};

const traverse = (layer) => {
  if (('layers' in layer) && layer.layers.length) {
    layer.layers.forEach(subLayers => traverse(subLayers));
  }

  // TODO: Make a function for this
  if (layer.style.fills.length) {
    const { color } = layer.style.fills[0];

    _colors[color] = _colors[color] ? [..._colors[color], layer.id] : [layer.id];
  }

  if (layer.style.borders.length) {
    const { color } = layer.style.borders[0];

    _colors[color] = _colors[color] ? [..._colors[color], layer.id] : [layer.id];
  }
};

export default function () {
  console.log('IM CALLED');
  traverse(sketch.getSelectedDocument().pages[0]);

  return _colors;
}
