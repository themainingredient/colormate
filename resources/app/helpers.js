import * as helpers from './helpers'; // eslint-disable-line import/no-self-import

export const calcOpacityPercentage = (hexColor) => {
  const hexOpacity = hexColor.substr(-2);
  return Math.round(parseInt(hexOpacity, 16) / 2.55);
};

export const calculateLuminance = (color) => {
  // Rebasing the incoming hex color to a value between 0 and 1, 0 being 0% intensity, and 1 being 100% intensity
  const rebasedColor = parseInt(color, 16) / 255;

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
