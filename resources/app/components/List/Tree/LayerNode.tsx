import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useHover from '../../../hooks/useHover';
import ListContext from '../../../ListContext';

import {
  NodeWrapper, StyledArrow, Name, ColorType,
} from './LayerNode.styles';

import Artboard from '../../../assets/artboard.svg';
import ShapePath from '../../../assets/Rectangle.svg';
import Group from '../../../assets/group.svg';
import Text from '../../../assets/textIcon.svg';

const LayerNode = ({ layer, generation, children }) => {
  const [isOpen, setOpen] = useState(true);
  const [isSelected, setSelected] = useState();
  const [isLastNode, setLastNode] = useState();
  const { selectedLayer, setSelectedLayer } = useContext(ListContext);
  const [isHovered, hoverRef] = useHover();

  const {
    name, id, type, colorType,
  } = layer;

  useEffect(() => {
    'children' in layer && layer.children.length ? setLastNode(false) : setLastNode(true);
  }, []);

  useEffect(() => {
    setSelected(selectedLayer === id);
  }, [selectedLayer]);

  const handleClick = () => {
    setSelectedLayer(id);
    window.postMessage('selectLayer', id);
  };

  return (
    <>
      <NodeWrapper ref={hoverRef} generation={generation} onClick={() => handleClick()} isSelected={isSelected}>
        {!isLastNode ? (
          <StyledArrow
            isOpen={isOpen}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!isOpen);
            }}
          />
        ) : (
          <ColorType type={colorType} />
        )}
        {(() => {
          switch (type) {
            case 'Artboard':
              return <Artboard />;
            case 'Group':
              return <Group />;
            case 'ShapePath':
              return <ShapePath />;
            case 'Text':
              return <Text />;
            case 'Page':
            case 'Shape':
            default:
              return null;
          }
        })()}
        <Name isHovered={isHovered} isSelected={isSelected}>
          {name}
        </Name>
      </NodeWrapper>
      {!isLastNode && isOpen && <>{children || null}</>}
    </>
  );
};

LayerNode.propTypes = {
  layer: PropTypes.object.isRequired,
  generation: PropTypes.number.isRequired,
  children: PropTypes.array,
};

LayerNode.defaultProps = {
  children: [],
};

export default LayerNode;