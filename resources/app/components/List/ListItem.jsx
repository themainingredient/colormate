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
} from './ListItem.styles';
import ListItemTree from './ListItemTree';
import ListContext from '../../ListContext';
import { transformSketchColorMap } from '../../helpers/transform-sketch-colormap.ts';

import { calcOpacityPercentage, calculateContrast } from '../../helpers/calculations.ts';

const isColorContrasting = color => calculateContrast(color) > 1.2;

const ListItem = ({ color, instances, index }) => {
  const [isSelected, setSelected] = useState();
  const [realLayers, setRealLayers] = useState();
  const { selectedColor, setSelectedColor } = useContext(ListContext);
  const opacityPercentage = calcOpacityPercentage(color);

  useEffect(() => {
    const layers = transformSketchColorMap({ [color]: instances });
    setRealLayers(layers[0]);
  }, []);

  useEffect(() => {
    setSelected(selectedColor === index);
  }, [selectedColor]);

  const handleListItemClick = (itemIndex) => {
    setSelectedColor(itemIndex === selectedColor ? null : itemIndex);
  };

  return (
    <>
      <ListItemWrapper isActive={isSelected} onClick={() => handleListItemClick(index)}>
        <ColorDataWrapper>
          <DotWrapper>
            <DotBG />
            <DotColor color={color} isBorderNeeded={isColorContrasting(color)} />
          </DotWrapper>
          <Title isActive={isSelected}>{color.toUpperCase().slice(0, -2)}</Title>
          <Spacer />
          {opacityPercentage < 100 && <Label isActive={isSelected}>{opacityPercentage}%</Label>}
        </ColorDataWrapper>
        <IndicatorArrow isActive={isSelected} />
        <Instances isActive={isSelected}>{instances.length}x</Instances>
      </ListItemWrapper>
      {isSelected && <ListItemTree tree={realLayers} />}
    </>
  );
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;
