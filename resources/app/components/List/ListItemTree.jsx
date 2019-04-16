import React from 'react';
import styled from 'styled-components';

import ColorLayer from './Tree/ColorLayer';
import WrapperLayer from './Tree/WrapperLayer';

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
        <WrapperLayer layer={tree} generation={generation}>
          {tree.children.map(child => renderLayer(child, generation + 1))}
        </WrapperLayer>
      </>
    );
  }
};

const ListItemTree = ({ tree }) => {
  return <ListItemTreeWrapper>{renderLayer(tree)}</ListItemTreeWrapper>;
};

export default ListItemTree;
