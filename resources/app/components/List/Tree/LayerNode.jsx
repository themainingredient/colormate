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

  return (
    <>
      <NodeWrapper ref={hoverRef} generation={generation} onClick={() => setSelectedLayer(id)} isSelected={isSelected}>
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
            case 'Page':
              return null;
            case 'Artboard':
              return <Artboard />;
            case 'Group':
              return <Group />;
            case 'ShapePath':
              return <ShapePath />;
            default:
              return <p>Unknown type</p>;
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
