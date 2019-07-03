import { omit } from 'lodash';

export const replaceColor = (colors: any, colorToReplace: string, targetColor: string) => {
  colorToReplace = colorToReplace.toLowerCase();
  targetColor = targetColor.toLowerCase();

  if (colorToReplace === targetColor) {
    return;
  }
  const updatedColorLayers = colors[colorToReplace];

  if (!updatedColorLayers) {
    throw new Error(
      `colorToReplace ${colorToReplace} not present in colors ${JSON.stringify(colors, null, 2)}`,
    );
  }

  const targetLayers = !colors[targetColor] ? updatedColorLayers : [...colors[targetColor], ...updatedColorLayers];

  return {
    ...omit(colors, colorToReplace),
    [targetColor]: targetLayers,
  };
};
