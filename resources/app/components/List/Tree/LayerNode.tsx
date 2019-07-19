import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useHover from '../../../hooks/useHover';
import ListContext from '../../../ListContext';
import ReplaceBtn from '../../../assets/replaceBtn.svg';
import ReplaceBtnHover from '../../../assets/replaceBtnHover.svg';

import {
  NodeWrapper, StyledArrow, Name, ColorType, Spacer,
} from './LayerNode.styles';

import Artboard from '../../../assets/artboard.svg';
import ShapePath from '../../../assets/Rectangle.svg';
import Group from '../../../assets/group.svg';
import Text from '../../../assets/textIcon.svg';
import ColorPicker from '../../ColorPicker';

const LayerNode = ({
  layer, generation, children, color,
}) => {
  const [isOpen, setOpen] = useState(true);
  const [isSelected, setSelected] = useState();
  const [isLastNode, setLastNode] = useState();
  const { selectedLayer, setSelectedLayer } = useContext(ListContext);
  const [isHovered, hoverRef] = useHover();
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

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
    const shouldCenter = type === 'Artboard';
    setSelectedLayer(id);
    window.postMessage('selectLayer', id, shouldCenter);
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  };

  const ReplaceColorIcon = () => {
    const style = {
      cursor: 'pointer',
      height: 25,
      width: 25,
      marginRight: 8,
    };

    if (isColorPickerVisible) {
      return <ReplaceBtnHover style={style} onClick={() => toggleColorPicker()} />;
    }

    return <ReplaceBtn style={style} onClick={() => toggleColorPicker()} />;
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
          <ColorType colorType={colorType} />
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

        <Spacer />

        {isLastNode && <ReplaceColorIcon />}

        {isColorPickerVisible && <ColorPicker color={color} ids={[id]} onBackgroundClick={toggleColorPicker} />}

      </NodeWrapper>
      {!isLastNode && isOpen && <>{children || null}</>}
    </>
  );
};

LayerNode.propTypes = {
  layer: PropTypes.object.isRequired,
  generation: PropTypes.number.isRequired,
  children: PropTypes.array,
  color: PropTypes.string,
};

LayerNode.defaultProps = {
  children: [],
  color: '',
};

export default LayerNode;
