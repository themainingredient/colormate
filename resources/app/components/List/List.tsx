import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItem from './ListItem';

const ListWrapper = styled.div`
  height: 509px; 
  overflow-y: scroll;
`;

const List = ({ colorList }) => {
  return (
    <ListWrapper>
      {Object.entries(colorList).map(([color, instances], index) => (
        <ListItem
          key={index}
          color={color}
          instances={instances as any[]}
          index={index}
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
