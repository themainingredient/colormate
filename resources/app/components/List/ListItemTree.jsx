import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ColorLayer from './Tree/ColorLayer';
import WrapperLayer from './Tree/WrapperLayer';

const ListItemTreeWrapper = styled.div`
  margin: 16px 0;
`;

const renderLayer = (tree, handleLayerClick, selectedLayer, generation = 0) => {
  if (!('name' in tree)) {
    return tree.children.map(page => renderLayer(page, handleLayerClick, selectedLayer, generation + 1));
  }

  if (!('children' in tree)) {
    return (
      <ColorLayer
        layer={tree}
        generation={generation}
        handleLayerClick={handleLayerClick}
        selectedLayer={selectedLayer}
      />
    );
  }

  if ('children' in tree && tree.children.length) {
    return (
      <>
        <WrapperLayer
          layer={tree}
          generation={generation}
          handleLayerClick={handleLayerClick}
          selectedLayer={selectedLayer}
        >
          {tree.children.map(child => renderLayer(child, handleLayerClick, selectedLayer, generation + 1))}
        </WrapperLayer>
      </>
    );
  }

  return null;
};

const ListItemTree = ({ tree, handleLayerClick, selectedLayer }) => {
  return <ListItemTreeWrapper>{renderLayer(tree, handleLayerClick, selectedLayer)}</ListItemTreeWrapper>;
};

ListItemTree.propTypes = {
  tree: PropTypes.object.isRequired,
  handleLayerClick: PropTypes.func.isRequired,
  selectedLayer: PropTypes.string.isRequired,
};

export default ListItemTree;
