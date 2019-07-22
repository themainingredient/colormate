import React from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import styled from 'styled-components';

import { calculateColorWithAlpha } from '../helpers/calculations';

interface ColorPickerProps {
  color: string;
  ids: string[];
  onBackgroundClick(): void;
}

const ColorPickerWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 84px;
  right: 0px;
`;

const ColorPickerBackground = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ColorPicker = ({ color, ids, onBackgroundClick }: ColorPickerProps) => {
  const replaceColor = (colorToReplace: string, targetColor: string, layerIds: string[]) => {
    window.postMessage('replaceColor', {
      message: 'Replacing the color',
      colorToReplace,
      targetColor,
      layerIds,
    });
  };

  const handleReplaceColorComplete = (targetColor: ColorResult) => {
    replaceColor(color, calculateColorWithAlpha(targetColor), ids);
  };

  return (
    <ColorPickerWrapper>
      <ColorPickerBackground onClick={onBackgroundClick} />
      <SketchPicker
        width='200px'
        presetColors={[]} // We can fetch the documentcolors and put them here to have them in the colorpicker
        color={color}
        onChangeComplete={(newColor: ColorResult) => handleReplaceColorComplete(newColor)}
      />
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
