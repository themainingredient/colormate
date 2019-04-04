export const calcOpacityPercentage = (hexColor) => {
  const hexOpacity = hexColor.substr(-2);
  return Math.round(parseInt(hexOpacity, 16) / 2.55);
};
