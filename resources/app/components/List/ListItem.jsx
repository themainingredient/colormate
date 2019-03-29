import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItemWrapper, ColorDataWrapper, Dot, Title, Instances,
} from './ListItem.styles';

const ListItem = ({ color, instances }) => (
  <ListItemWrapper>
    <ColorDataWrapper>
      <Dot color={color} />
      <Title>{color.toUpperCase().slice(0, -2)}</Title>
    </ColorDataWrapper>
    <Instances>{instances}x</Instances>
  </ListItemWrapper>
);

ListItem.propTypes = {
  color: PropTypes.string.isRequired,
  instances: PropTypes.array.isRequired,
};

export default ListItem;
