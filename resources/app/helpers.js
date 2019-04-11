import * as helpers from './helpers'; // eslint-disable-line import/no-self-import

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
export const calculateLuminance = (color) => {
  // Rebasing the incoming hex color to a value between 0 and 1, 0 being 0% intensity, and 1 being 100% intensity
  const rebasedColor = parseInt(color, 16) / 255;

  /**
   * There are 2 different ways to calculate the Luminance of a color, depending on the input value.
   * When the color intensity is lower than 3.928%, meaning black or really dark grey, we use the first method.
   * When the color intensity is higher we use the second method.
   */

  if (rebasedColor <= 0.03928) {
    return rebasedColor / 12.92;
  }

  return Math.pow((rebasedColor + 0.055) / 1.055, 2.4); // eslint-disable-line no-restricted-properties
};

export const calculateCombinedLuminance = (hexColor) => {
  const cleanedColor = hexColor.substr(1); // Remove the # of the incoming hex color
  const R = cleanedColor.substr(0, 2); // Grab the first and second chars in the color, representing the red value
  const G = cleanedColor.substr(2, 2); // Grab the third and fourth chars in the color, representing the green value
  const B = cleanedColor.substr(4, 2); // Grab the fifth and sixth chars in the color, representing the blue value

  /**
   * Here we calculate the Luminance of a color in the RGB space
   * The numbers that we use to multiply the calculateLuminance of R, G, and B is how much the light contributes
   * to the intensity perceived by humans. Green light contributes the most, and blue the least.
   *
   * More info here: https://en.wikipedia.org/wiki/Relative_luminance
   */
  return (
    0.2126 * helpers.calculateLuminance(R)
    + 0.7152 * helpers.calculateLuminance(G)
    + 0.0722 * helpers.calculateLuminance(B)
  );
};

export const calculateContrast = (color) => {
  const colorLuminance = calculateCombinedLuminance(color);
  /**
   * The luminance of a color is represented by a color between 0 and 1.
   * Black has a luminosity of 0, meaning it reflects none of the light.
   * White has a luminosity of 1, meaning it reflects all the light the falls on it.
   */
  const whiteLuminance = 1;

  if (colorLuminance === whiteLuminance) return 0;

  return Number(((whiteLuminance + 0.05) / (colorLuminance + 0.05)).toFixed(2));
};

export const closeWindow = () => {
  window.postMessage('closeWindow');
};
