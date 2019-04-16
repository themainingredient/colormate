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

import { calcOpacityPercentage, calculateContrast } from '../../helpers';

const isColorContrasting = color => calculateContrast(color) > 1.2;

const MockLayers = {
  color: '#34F378FF',
  children: [
    {
      name: 'Page 1',
      id: 'FF29A9D3-282A-4446-BF66-FD889B1DF905',
      type: 'Page',
      children: [
        {
          name: 'Artboard',
          id: '73F57CCA-4B9A-4E1E-A382-3792D6896C58',
          type: 'Artboard',
          children: [
            {
              name: 'Rectangle1',
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82D',
              type: 'ShapePath',
              colorType: 'fill',
            },
            {
              name: 'Rectangle2',
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82E',
              type: 'ShapePath',
              colorType: 'border',
            },
          ],
        },
        {
          name: 'Artboard2',
          id: '73F57CCA-4B9A-4E1E-A382-3792D6896C59',
          type: 'Artboard',
          children: [
            {
              name: 'Rectangle1',
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82F',
              type: 'ShapePath',
              colorType: 'fill',
            },
            {
              name: 'Rectangle2',
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82G',
              type: 'ShapePath',
              colorType: 'border',
            },
          ],
        },
      ],
    },
  ],
};

const ListItem = ({ color, instances, index }) => {
  const [isActive, setActive] = useState();
  const { selectedColor, setSelectedColor } = useContext(ListContext);
  const opacityPercentage = calcOpacityPercentage(color);

  useEffect(() => {
    setActive(selectedColor === index);
  }, [selectedColor]);

  const handleListItemClick = (itemIndex) => {
    setSelectedColor(itemIndex === selectedColor ? null : itemIndex);
  };

  return (
    <>
      <ListItemWrapper isActive={isActive} onClick={() => handleListItemClick(index)}>
        <ColorDataWrapper>
          <DotWrapper>
            <DotBG />
            <DotColor color={color} isBorderNeeded={isColorContrasting(color)} />
          </DotWrapper>
          <Title isActive={isActive}>{color.toUpperCase().slice(0, -2)}</Title>
          <Spacer />
          {opacityPercentage < 100 && <Label isActive={isActive}>{opacityPercentage}%</Label>}
        </ColorDataWrapper>
        <IndicatorArrow isActive={isActive} />
        <Instances isActive={isActive}>{instances.length}x</Instances>
      </ListItemWrapper>
      {isActive && <ListItemTree tree={MockLayers} />}
    </>
  );
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default ListItem;
