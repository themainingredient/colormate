import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LayerNode from './Tree/LayerNode';
import { LayerType } from '../../enums/layer-type.enum';

const ListItemTreeWrapper = styled.div`
  margin: 16px 0;
`;

const renderLayer = (tree, color, generation = 0) => {
  if ('layers' in tree) {
    return tree.layers.map(page => renderLayer(page, color, generation + 1));
  }

  if (!('children' in tree)) {
    return <LayerNode key={tree.id} layer={tree} generation={generation} color={color} />;
  }

  if ('children' in tree && tree.children.length) {
    if (tree.type !== LayerType.page && tree.type !== LayerType.artboard) {
      return tree.children.map(child => renderLayer(child, color, generation));
    }
    return (
      <LayerNode key={tree.id} layer={tree} generation={generation} color={color}>
        {tree.children.map(child => renderLayer(child, color, generation + 1))}
      </LayerNode>
    );
  }

  return null;
};

const ListItemTree = ({ tree, color }) => {
  console.log(`ListItemTree.tsx - ${tree}`);
  return <ListItemTreeWrapper>{renderLayer(tree, color)}</ListItemTreeWrapper>;
};

ListItemTree.propTypes = {
  tree: PropTypes.object.isRequired,
};

export default ListItemTree;
