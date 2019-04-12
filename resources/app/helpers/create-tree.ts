const getHierarchy = (layer: InputLayer): Layer[] => {
  if ('parents' in layer && layer.parents!.length) {
    return [
      ...layer.parents,
      { name: layer.name },
    ];
  }

  return [{ name: layer.name }];
};

const getLayers = (hierarchy: {name: string}[]): Layer => {
    if (hierarchy.length === 1) {
      return hierarchy[0];
    }
  
    return ({
      name: hierarchy[0].name,
      children: [getLayers(hierarchy.splice(1))],
    });
};
  
// const createTreeObjectFromLevelsArray = (levelsArray) => {
//   if (levelsArray.length === 1) {
//     return ({
//       name: levelsArray[0].name,
//     });
//   }

//   return getLayers(levelsArray);
// };
  
//   export const colorsObjectToArray = (colorsObject) => {
//     const output = Object.entries(colorsObject).map(([color, instances]) => ({
//       color,
//       layers: instances.reduce((acc, instance) => {
//         const levelsArray = getHierarchy(instance);
  
//         if (acc.length === 0) {
//           return [
//             ...acc,
//             createTreeObjectFromLevelsArray(levelsArray),
//           ];
//         }
  
//         // [
//         //   { name: 'Rectangle2' }
//         // ]
  
//         const recursion = (accumulator, arr) => {
//           if (!arr.length) { return; }
  
//           const matchingName = accumulator.find((layer) => { return layer.name === arr[0].name; });
//           if (matchingName) {
//             console.log('TRUE');
//             console.log(arr[0].name);
//             recursion(matchingName.children, arr.splice(1));
//           } else {
//             console.log('FALSE');
//             console.log(arr[0].name);
//             // Start creating the objects from here
//             return createTreeObjectFromLevelsArray(arr);
//           }
//         };
  
//         recursion(acc, levelsArray);
  
  
//         // given a level
//         // loop acc array
//         // find a matching name
//         // if not found, just create the element normally
//         // if found, go into the item.children and iterate on the remaining levels
//       }, []),
//     }));
  
//     console.log('helpers.js - output ', JSON.stringify(output, null, 2));
  
//     return output;
//   };

export const mapColorMapToColors = (colorsObject: ColorMap): Color[] => {

  const output = Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    layers: inputLayers.map((inputLayer) => {
      const hierarchy = getHierarchy(inputLayer);
      const returnObj = getLayers(hierarchy);

      return returnObj;
    }),
  }));

  return output;
};

interface ColorMap {
  [hexColor: string]: InputLayer[]
}

interface InputLayer {
  name: string;
  parents?: {name: string}[];
}

interface Layer {
  name: string;
  children?: Layer[];
}

interface Color {
  color: string;
  layers: Layer[];
}