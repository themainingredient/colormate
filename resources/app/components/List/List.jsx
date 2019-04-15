import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItem from './ListItem';

const ListWrapper = styled.div`
  height: 369px;
  overflow-y: scroll;
`;

const List = ({ colorList }) => {
  const [activeItem, setActiveItem] = useState();

  const handleListItemClick = (itemIndex) => {
    setActiveItem(itemIndex === activeItem ? null : itemIndex);
  };

  return (
    <ListWrapper>
      {Object.keys(colorList).map((color, index) => (
        <ListItem
          color={color}
          instances={colorList[color]}
          clickHandler={(itemIndex) => {
            handleListItemClick(itemIndex);
          }}
          index={index}
          isActive={index === activeItem}
        />
      ))}
    </ListWrapper>
  );
};

List.propTypes = {
  colorList: PropTypes.shape({
    layer: PropTypes.object,
    parents: PropTypes.array,
  }).isRequired,
};

export default List;
