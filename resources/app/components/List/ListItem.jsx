import React from 'react';
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

import { calcOpacityPercentage } from '../../helpers';

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
          id: '73F57CCA-4B9A-4E1E-A382-3792D6896C59',
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
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82D',
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
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82D',
              type: 'ShapePath',
              colorType: 'fill',
            },
            {
              name: 'Rectangle2',
              id: '6D474D4A-39CA-462E-9725-A66FE0C4F82D',
              type: 'ShapePath',
              colorType: 'border',
            },
          ],
        },
      ],
    },
  ],
};

const Dot = ({ color }) => (
  <DotWrapper>
    <DotBG />
    <DotColor color={color} />
  </DotWrapper>
);

const ListItem = ({
  color, instances, clickHandler, index, isActive,
}) => {
  const opacityPercentage = calcOpacityPercentage(color);

  return (
    <>
      <ListItemWrapper isActive={isActive} onClick={() => clickHandler(index)}>
        <ColorDataWrapper>
          <Dot color={color} />
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

Dot.propTypes = {
  color: PropTypes.string.isRequired,
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ListItem;
