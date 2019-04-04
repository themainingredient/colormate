import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemWrapper, ColorDataWrapper, DotWrapper, DotBG, DotColor, Title, Instances,
} from './ListItem.styles';

const Dot = ({ color }) => (
  <DotWrapper>
    <DotBG />
    <DotColor color={color} />
  </DotWrapper>
);

const ListItem = ({ color, instances }) => (
  <ListItemWrapper>
    <ColorDataWrapper>
      <Dot color={color} />
      <Title>{color.toUpperCase().slice(0, -2)}</Title>
    </ColorDataWrapper>
    <Instances>{instances}x</Instances>
  </ListItemWrapper>
);

Dot.propTypes = {
  color: PropTypes.string.isRequired,
};

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
};

export default ListItem;
