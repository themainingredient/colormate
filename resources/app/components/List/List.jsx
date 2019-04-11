import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListItem from './ListItem';

const ListWrapper = styled.div`
  height: 369px;
  overflow-y: scroll;
`;

const List = ({ colorList }) => {
  return (
    <ListWrapper>
      {Object.keys(colorList).map(color => (
        <ListItem color={color} instances={colorList[color]} />
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
