import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../Global.styles';

import Arrow from '../../assets/arrowGrey.svg';

const { colors } = GlobalStyles;

const LayerWrapper = styled.div`
  padding: 8px 24px;

  &:hover {
    background-color: ${colors.LightGrey};
  }
`;

const Layer = ({ name, children }) => (
  <LayerWrapper>
    {name}
    {children || null}
  </LayerWrapper>
);

const ListItemTreeWrapper = styled.div`
  margin: 16px 0;
`;

const renderLayer = (tree) => {
  if (!('name' in tree)) {
    return tree.children.map(page => renderLayer(page));
  }

  if (!('children' in tree)) {
    return <Layer name={tree.name} />;
  }

  if ('children' in tree && tree.children.length) {
    return <Layer name={tree.name}>{tree.children.map(layert => renderLayer(layert))}</Layer>;
  }
};

const ListItemTree = ({ tree }) => {
  return <ListItemTreeWrapper>{renderLayer(tree)}</ListItemTreeWrapper>;
};

export default ListItemTree;
