import sketch from 'sketch';

const _colors = {};

const applyStrategy = (layer, ancestry) => {
  if (layer.style.fills.length) {
    const { color } = layer.style.fills[0];

    const layerData = {
      id: layer.id,
      colorType: 'fill',
      ancestry,
    };

    _colors[color] = _colors[color] ? [..._colors[color], layerData] : [layerData];
  }

  if (layer.style.borders.length) {
    const { color } = layer.style.borders[0];

    const layerData = {
      id: layer.id,
      colorType: 'border',
      ancestry,
    };

    console.log('ANCESTRY ', ancestry);

    _colors[color] = _colors[color] ? [..._colors[color], layerData] : [layerData];
  }
};

const traverse = (layer, ancestry = []) => {
  if (('layers' in layer) && layer.layers.length) {
    layer.layers.forEach(subLayers => traverse(subLayers, [...ancestry, layer.id]));
  }

  applyStrategy(layer, ancestry);
};

export default function () {
  traverse(sketch.getSelectedDocument().pages[0]);
  console.log(_colors);
  return _colors;
}
