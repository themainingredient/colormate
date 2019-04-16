import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItem from './ListItem';

const ListWrapper = styled.div`
  height: 369px;
  overflow-y: scroll;
`;

const List = ({ colorList }) => {
  const [activeColor, setActiveColor] = useState();
  const [selectedLayer, setSelectedLayer] = useState();

  const handleColorClick = (itemIndex) => {
    setActiveColor(itemIndex === activeColor ? null : itemIndex);
  };

  const handleLayerClick = (layerID) => {
    setSelectedLayer(layerID);
  };

  return (
    <ListWrapper>
      {Object.keys(colorList).map((color, index) => (
        <ListItem
          color={color}
          instances={colorList[color]}
          clickHandler={(itemIndex) => {
            handleColorClick(itemIndex);
          }}
          layerClickHandler={(layerID) => {
            handleLayerClick(layerID);
          }}
          selectedLayer={selectedLayer}
          index={index}
          isActive={index === activeColor}
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
