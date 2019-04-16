import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LayerNode from './Tree/LayerNode';

const ListItemTreeWrapper = styled.div`
  margin: 16px 0;
`;

const renderLayer = (tree, generation = 0) => {
  if (!('name' in tree)) {
    return tree.children.map(page => renderLayer(page, generation + 1));
  }

  if (!('children' in tree)) {
    return <LayerNode key={tree.id} layer={tree} generation={generation} />;
  }

  if ('children' in tree && tree.children.length) {
    return (
      <LayerNode key={tree.id} layer={tree} generation={generation}>
        {tree.children.map(child => renderLayer(child, generation + 1))}
      </LayerNode>
    );
  }

  return null;
};

const ListItemTree = ({ tree }) => {
  return <ListItemTreeWrapper>{renderLayer(tree)}</ListItemTreeWrapper>;
};

ListItemTree.propTypes = {
  tree: PropTypes.object.isRequired,
};

export default ListItemTree;
