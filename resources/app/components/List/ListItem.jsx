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
} from './ListItem.styles';

import { calcOpacityPercentage, calculateContrast } from '../../helpers';

const isColorContrasting = color => calculateContrast(color) > 1.2;

const Dot = ({ color }) => (
  <DotWrapper>
    <DotBG />
    <DotColor color={color} isBorderNeeded={isColorContrasting(color)} />
  </DotWrapper>
);

const ListItem = ({ color, instances }) => {
  const opacityPercentage = calcOpacityPercentage(color);

  return (
    <ListItemWrapper>
      <ColorDataWrapper>
        <Dot color={color} />
        <Title>{color.toUpperCase().slice(0, -2)}</Title>
        <Spacer />
        {opacityPercentage < 100 && <Label>{opacityPercentage}%</Label>}
      </ColorDataWrapper>
      <Instances>{instances}x</Instances>
    </ListItemWrapper>
  );
};

Dot.propTypes = {
  color: PropTypes.string.isRequired,
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.number.isRequired,
};

export default ListItem;
