import sketch from 'sketch';

const colors = [];

const getColor = (type, layer) => {
  if (layer.style.fills.length > 0) {
    colors[type].push(layer.style.fills[0].color);

    // console.log('Found a color!', colors);
  }
};

const traverse = (layer) => {
  for (let i = 0; i < layer.layers.length; i++) {
    // console.log(`processing layer ${i}`);
    // console.log(layer.layers[i]);
    nextStep(layer.layers[i]);
  }
};

const nextStep = (layer) => {
  switch (layer.type) {
    case 'Artboard':
      traverse(layer);
      break;
    case 'Group':
      traverse(layer);
      break;
    case 'ShapePath':
      getColor(layer);
      break;
    case 'Shape':
      getColor(layer);
      break;
    case 'Image':
      // console.log(layer.type);
      break;
    default:
      // console.log(layer.type);
      break;
  }
};

export default function () {
  const doc = sketch.getSelectedDocument();

  const { pages } = doc;

  // console.log(pages[0].layers[0]);
  traverse(pages[0].layers[0]);
}

// Layer types:
// * Artboard
// * Group
// * Shape
// * Image
// * ShapePath
// * Text
// * Symbol Master
// * Symbol Instance
// * Hotspot
// * Slice
