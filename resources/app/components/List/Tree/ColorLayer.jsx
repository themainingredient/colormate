import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GlobalStyles from '../../../Global.styles';
import useHover from '../../../hooks/useHover';

import ShapePath from '../../../assets/Rectangle.svg';

const { colors, fonts } = GlobalStyles;

const ColorLayerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ generation }) => 16 * generation}px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${({ isSelected }) => (isSelected ? colors.TMIBlueLight : '')};
`;

const StyledShapePath = styled(ShapePath)`
  margin-right: 8px;
`;

const ColorType = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.DarkGrey};
  background-color: ${colorType => (colorType.type === 'fill' ? colors.DarkGrey : '')};
  margin-right: 16px;
`;

const Name = styled.p`
  font-family: ${fonts.SFPro.reg};
  font-size: 14px;
  color: ${({ isSelected }) => (isSelected ? colors.TMIBlue : colors.DarkGrey)};
  border-bottom: ${({ isHovered }) => (isHovered ? `1px solid ${colors.TMIBlue}` : '1px solid #00000000')};
`;

const ColorLayer = ({
  layer, generation, handleLayerClick, selectedLayer,
}) => {
  const [isHovered, hoverRef] = useHover();

  const {
    colorType, id, name, type,
  } = layer;

  return (
    <ColorLayerWrapper
      ref={hoverRef}
      generation={generation}
      onClick={() => handleLayerClick(id)}
      isSelected={selectedLayer === id}
    >
      <ColorType type={colorType} />
      {(() => {
        switch (type) {
          case 'ShapePath':
            return <StyledShapePath />;
          default:
            return <p>Unknown type</p>;
        }
      })()}
      <Name isHovered={isHovered} isSelected={selectedLayer === id}>
        {name}
      </Name>
    </ColorLayerWrapper>
  );
};

ColorLayer.propTypes = {
  layer: PropTypes.object.isRequired,
  generation: PropTypes.number.isRequired,
  handleLayerClick: PropTypes.func.isRequired,
  selectedLayer: PropTypes.string.isRequired,
};

export default ColorLayer;
