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

// const isMatching = (candidates: Layer[], layerToSearch: Layer): boolean => {
//   for (var property in candidates) {
//     if (property === 'name') {
//       if ()
//     }
//     if (candidates[property] === layerToSearch.name) {
//       return true;
//     }
//   }

  
//   if ('children' in candidate && candidate.children!.length) {
//     return isMatching(candidate.children, layerToSearch)
//   }
// }

export const mapColorMapToColors = (colorsObject: ColorMap): Color[] => {

  const colors = Object.entries(colorsObject).map(([color, inputLayers]) => ({
    color,
    layers: inputLayers.map((inputLayer) => {
      const hierarchy = getHierarchy(inputLayer);
      const returnObj = getLayers(hierarchy);

      return returnObj;
    }),
  }));

  console.log('create-tree.ts - returnObj: ', JSON.stringify(colors, null, 2));

  const colorsWithGroupedLayers: Color[] = colors.map(color => {
    return {
      ...color,
      layers: color.layers.reduce((acc: Layer[], cur: Layer) => {
        recursion(acc, cur)
        return acc;
      }, [])
    }
  })

  return colorsWithGroupedLayers;
};

const recursion = (x: Layer[] | any, objectToFind: Layer) => {
  console.log('objectToFind', objectToFind);
      for (var property in x) {
        if (x.hasOwnProperty(property)) {
          console.log('Current property', property);
          console.log('Current value', x[property]);

            if (property == "name") {
              if (x[property] === objectToFind.name) {
                console.log('found!', x[property]);
                      
                if (!x['children'].length) {
                  x['children'].push(...objectToFind.children);

                  return;
                }

                objectToFind.children.forEach(child => {
                    if (!isLayerInArrayOfLayers(child, x['children'])) {
                      console.log('Appending child', child);
                      x['children'].push(child);
                    } else {
                      console.log('check on obj children');
                      recursion(x['children'], child);
                    }
                  })
              }
            }

            if (typeof x[property] == "object"){
                console.log('APPLY RECUSION');
                recursion(x[property], objectToFind);
            }
        }
    }
}

const isLayerInArrayOfLayers = (layer: Layer, layers: Layer[]) => {
  const found = layers.find(cur => cur.name === layer.name);

  return !!found;
}

// const appendChild = (siblingLayer: Layer, matchingLayer: Layer, layerToAppend: Layer) => {
//   if (siblingLayer.name === matchingLayer.name) {
//     return {
//       ...siblingLayer,
//       children: [
//         ...siblingLayer.children,
//         layerToAppend
//       ]
//     }
//   }

  // siblingLayer.children.

  // return appendChild(siblingLayer!.children, matchingLayer, layerToAppend);
  // if (siblingLayer.)
//   for (var property in siblingLayer) {
//     if (siblingLayer.hasOwnProperty(property)) {
//       if (typeof siblingLayer[property] == "object"){
//           recursiveIteration(siblingLayer[property]);
//       }else{
//           //found a property which is not an object, check for your conditions here
//       }
//   }
//   }
// }
