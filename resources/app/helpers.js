export const calcOpacityPercentage = (hexColor) => {
  const hexOpacity = hexColor.substr(-2);
  return Math.round(parseInt(hexOpacity, 16) / 2.55);
};

const mapLevelArrayToTreeObject = (inputArray) => {
  if (inputArray.length === 1) {
    return ({
      name: inputArray[0].name,
    });
  }

  return ({
    name: inputArray[0].name,
    children: [mapLevelArrayToTreeObject(inputArray.splice(1))],
  });
};

const mapInstanceToLevelsArray = (instance) => {
  if ('parents' in instance && instance.parents.length) {
    return [
      ...instance.parents,
      { name: instance.name },
    ];
  }

  return [{ name: instance.name }];
};

const createTreeObjectFromLevelsArray = (levelsArray) => {
  if (levelsArray.length === 1) {
    return ({
      name: levelsArray[0].name,
    });
  }

  return mapLevelArrayToTreeObject(levelsArray);
};

export const colorsObjectToArray = (colorsObject) => {
  const output = Object.entries(colorsObject).map(([color, instances]) => ({
    color,
    layers: instances.reduce((acc, instance) => {
      const levelsArray = mapInstanceToLevelsArray(instance);

      if (acc.length === 0) {
        return [
          ...acc,
          createTreeObjectFromLevelsArray(levelsArray),
        ];
      }

      // [
      //   { name: 'Rectangle2' }
      // ]

      const recursion = (accumulator, arr) => {
        if (!arr.length) { return; }

        const matchingName = accumulator.find((layer) => { return layer.name === arr[0].name; });
        if (matchingName) {
          console.log('TRUE');
          console.log(arr[0].name);
          recursion(matchingName.children, arr.splice(1));
        } else {
          console.log('FALSE');
          console.log(arr[0].name);
          // Start creating the objects from here
          return createTreeObjectFromLevelsArray(arr);
        }
      };

      recursion(acc, levelsArray);


      // given a level
      // loop acc array
      // find a matching name
      // if not found, just create the element normally
      // if found, go into the item.children and iterate on the remaining levels
    }, []),
  }));

  console.log('helpers.js - output ', JSON.stringify(output, null, 2));

  return output;
};

// export const colorsObjectToArray = (colorsObject) => {
//   const output = Object.entries(colorsObject).map(([color, instances]) => ({
//     color,
//     layers: instances.map((instance) => {
//       const levelsArray = mapInstanceToLevelsArray(instance);

//       if (levelsArray.length === 1) {
//         return ({
//           name: levelsArray[0].name,
//         });
//       }

//       const returnObj = mapLevelArrayToTreeObject(levelsArray);

//       return returnObj;
//     }),
//   }));

//   console.log('helpers.js - output ', JSON.stringify(output, null, 2));

//   return output;
// };
