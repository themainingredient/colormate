import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../../Global.styles';

import ShapePath from '../../../assets/Rectangle.svg';

const { colors, fonts } = GlobalStyles;

const ColorLayerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ generation }) => 16 * generation}px;
  padding-top: 4px;
  padding-bottom: 4px;
  &:hover {
    background-color: ${colors.LightGrey};
  }
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
`;

const ColorLayer = ({ layer, generation }) => {
  const {
    colorType, id, name, type,
  } = layer;

  return (
    <ColorLayerWrapper generation={generation}>
      <ColorType type={colorType} />
      {() => {
        switch (type) {
          case 'ShapePath':
            return <StyledShapePath />;
          default:
            return <p>Unknown type</p>;
        }
      }}
      <StyledShapePath />
      <Name>{name}</Name>
    </ColorLayerWrapper>
  );
};

export default ColorLayer;
