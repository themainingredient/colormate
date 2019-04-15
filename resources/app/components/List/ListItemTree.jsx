import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../Global.styles';

import ColorLayer from './Tree/ColorLayer';

const { colors } = GlobalStyles;

const LayerWrapper = styled.div`
  padding-left: ${({ generation }) => 16 * generation}px;
  padding-top: 4px;
  padding-bottom: 4px;
  &:hover {
    background-color: ${colors.LightGrey};
  }
`;

const Layer = ({ name, generation, children }) => (
  <LayerWrapper generation={generation}>
    {name}
    {children || null}
  </LayerWrapper>
);

const ListItemTreeWrapper = styled.div`
  margin: 16px 0;
`;

const renderLayer = (tree, generation = 0) => {
  if (!('name' in tree)) {
    return tree.children.map(page => renderLayer(page, generation + 1));
  }

  if (!('children' in tree)) {
    return <ColorLayer layer={tree} generation={generation} />;
  }

  if ('children' in tree && tree.children.length) {
    return (
      <>
        <Layer name={tree.name} generation={generation} />
        {tree.children.map(layert => renderLayer(layert, generation + 1))}
      </>
    );
  }
};

const ListItemTree = ({ tree }) => {
  return <ListItemTreeWrapper>{renderLayer(tree)}</ListItemTreeWrapper>;
};

export default ListItemTree;
