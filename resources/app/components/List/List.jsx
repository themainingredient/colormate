import React from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';

const ListWrapper = styled.div`
  height: 369px;
  overflow-y: scroll;
`;

// TODO: Add propTypes
const List = ({ colorList }) => (
  <ListWrapper>
    {Object.keys(colorList).map(color => (
      <ListItem color={color} instances={colorList[color].length} />
    ))}
  </ListWrapper>
);

export default List;
