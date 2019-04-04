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

import { getOpacityPercentage } from '../../helpers';

const Dot = ({ color }) => (
  <DotWrapper>
    <DotBG />
    <DotColor color={color} />
  </DotWrapper>
);

const ListItem = ({ color, instances }) => {
  const opacityPercentage = getOpacityPercentage(color);

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
  instances: PropTypes.array.isRequired,
};

export default ListItem;
