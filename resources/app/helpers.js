export const calcOpacityPercentage = (hexColor) => {
  const hexOpacity = hexColor.substr(-2);
  return Math.round(parseInt(hexOpacity, 16) / 2.55);
};

export const colorsObjectToArray = (colorsObject) => {
  return Object.entries(colorsObject).map(([color, instances]) => ({
    color,
    layers: instances.map((instance) => {
      if ('parents' in instance && instance.parents.length > 0) {
        const cleanInput = instance.parents;
        cleanInput.push({ name: instance.name });

        const recursiveFunc = (inputArray) => {
          if (inputArray.length === 1) {
            return ({
              name: inputArray[0].name,
            });
          }

          return ({
            name: inputArray[0].name,
            children: [recursiveFunc(inputArray.splice(1))],
          });
        };

        const returnObj = recursiveFunc(cleanInput);

        return returnObj;
      }

      return ({
        name: instance.name,
      });
    }),
  }));
};
