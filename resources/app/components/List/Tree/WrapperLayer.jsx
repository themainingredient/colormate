import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../../../Global.styles';
import useHover from '../../../hooks/useHover';

import Arrow from '../../../assets/arrowGrey.svg';
import Artboard from '../../../assets/artboard.svg';

const { colors, fonts } = GlobalStyles;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ generation }) => 16 * generation}px;
  padding-top: 8px;
  padding-bottom: 8px;

  &:hover {
    background-color: ${colors.LightGrey};
  }
`;

const StyledArrow = styled(Arrow)`
  margin-right: 8px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 150ms ease-in-out;
`;

const StyledArtboard = styled(Artboard)`
  margin-right: 8px;
`;

const Name = styled.p`
  font-family: ${fonts.SFPro.reg};
  font-size: 14px;
  color: ${colors.DarkGrey};
  border-bottom: ${({ isHovered }) => (isHovered ? `1px solid ${colors.TMIBlue}` : '1px solid #00000000')};
`;

const WrapperLayer = ({ layer, generation, children }) => {
  const [isOpen, setOpen] = useState(true);
  const [isHovered, hoverRef] = useHover();

  const { name, id, type } = layer;

  return (
    <>
      <Wrapper ref={hoverRef} generation={generation} onClick={() => setOpen(!isOpen)}>
        <StyledArrow isOpen={isOpen} />
        {(() => {
          switch (type) {
            case 'Page':
              return null;
            case 'Artboard':
              return <StyledArtboard />;
            default:
              return <p>Unknown type</p>;
          }
        })()}
        <Name isHovered={isHovered}>{name}</Name>
      </Wrapper>
      {isOpen && <>{children || null}</>}
    </>
  );
};

export default WrapperLayer;
