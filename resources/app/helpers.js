export const calcOpacityPercentage = (hexColor) => {
  const hexOpacity = hexColor.substr(-2);
  return Math.round(parseInt(hexOpacity, 16) / 2.55);
};

const inputValue = (color) => {
  const rebasedColor = parseInt(color, 16) / 255;

  if (rebasedColor <= 0.03928) {
    return rebasedColor / 12.92;
  }

  return Math.pow((rebasedColor + 0.055) / 1.055, 2.4); // eslint-disable-line no-restricted-properties
};

const calculateLuminance = (hexColor) => {
  const cleanedColor = hexColor.substr(1);
  const R = cleanedColor.substr(0, 2);
  const G = cleanedColor.substr(2, 2);
  const B = cleanedColor.substr(4, 2);

  return (
    0.2126 * inputValue(R) + 0.7152 * inputValue(G) + 0.0722 * inputValue(B)
  );
};

export const calculateContrast = (color) => {
  const lumColor = calculateLuminance(color);
  const white = '#FFFFFF';

  if (lumColor === white) return 0;

  return Number((1.05 / (lumColor + 0.05)).toFixed(2));
};
