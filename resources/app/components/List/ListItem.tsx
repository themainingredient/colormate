import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ListItemWrapper,
  ColorDataWrapper,
  DotWrapper,
  DotBG,
  DotColor,
  Title,
  Instances,
  Label,
  Spacer,
  IndicatorArrow,
  ColorPickerWrapper,
  ColorPickerBackground
} from './ListItem.styles';
import ListItemTree from './ListItemTree';
import ListContext from '../../ListContext';
import { transformSketchColorMap } from '../../helpers/transform-sketch-colormap';

import { calcOpacityPercentage, calculateContrast } from '../../helpers/calculations';
import { SketchPicker, ColorResult } from 'react-color';

const isColorContrasting = (color: any) => calculateContrast(color) > 1.2;

// TODO: replace dummy button
const ListItem = ({ color, instances, index }: { color: string, instances: any[], index: any }) => {
  const [isSelected, setSelected] = useState();
  const [realLayers, setRealLayers] = useState();
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const { selectedColor, setSelectedColor } = useContext(ListContext);
  const opacityPercentage = calcOpacityPercentage(color);

  useEffect(() => {
    const layers = transformSketchColorMap({ [color]: instances });
    setRealLayers(layers[0]);
  }, []);

  useEffect(() => {
    setSelected(selectedColor === index);
  }, [selectedColor]);

  const handleListItemClick = (itemIndex: any) => {
    setSelectedColor(itemIndex === selectedColor ? null : itemIndex);
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  }

  const handleReplaceColorComplete = (targetColor: ColorResult) => {
    replaceColor(color, targetColor.hex, instances)
    toggleColorPicker()
  }

  const replaceColor = (colorToReplace: string, targetColor: string, instances: {id: string}[]) => {
    const layerIds = instances.map(instance => instance.id);
    window.postMessage('replaceColor', {
      message: 'Replacing the color',
      colorToReplace,
      targetColor,
      layerIds
    });
  }

  return (
    <>
      <ListItemWrapper isActive={isSelected}>
        <ColorDataWrapper>
          <DotWrapper>
            <DotBG />
            <DotColor color={color} isBorderNeeded={isColorContrasting(color)} />
          </DotWrapper>
          <Title isActive={isSelected}>{color.toUpperCase().slice(0, -2)}</Title>
          <Spacer />
          {opacityPercentage < 100 && <Label isActive={isSelected}>{opacityPercentage}%</Label>}
        </ColorDataWrapper>
        <IndicatorArrow isActive={isSelected} onClick={() => handleListItemClick(index)}/>
        <button onClick={() => toggleColorPicker()}>Replace</button>
        <Instances isActive={isSelected}>{instances.length}x</Instances>
      </ListItemWrapper>
      {isSelected && <ListItemTree tree={realLayers} />}
      { isColorPickerVisible ? 
        <ColorPickerWrapper>
          <ColorPickerBackground onClick={ () => toggleColorPicker() }/>
          <SketchPicker width="200px" presetColors={[]} onChangeComplete={(color: ColorResult) => handleReplaceColorComplete(color) } />
        </ColorPickerWrapper> : null }
    </>
  );
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;
