import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import GlobalStyles from '../../../Global.styles';
import useHover from '../../../hooks/useHover';
import ListContext from '../../../ListContext';

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
  background-color: ${({ isSelected }) => (isSelected ? colors.TMIBlueLight : '')};
`;

const StyledArrow = styled(props => <Arrow {...omit(props, ['isOpen'])} />)`
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
  color: ${({ isSelected }) => (isSelected ? colors.TMIBlue : colors.DarkGrey)};
  border-bottom: ${({ isHovered }) => (isHovered ? `1px solid ${colors.TMIBlue}` : '1px solid #00000000')};
`;

const WrapperLayer = ({ layer, generation, children }) => {
  const [isOpen, setOpen] = useState(true);
  const { selectedLayer, setSelectedLayer } = useContext(ListContext);
  const [isHovered, hoverRef] = useHover();

  const { name, id, type } = layer;

  return (
    <>
      <Wrapper
        ref={hoverRef}
        generation={generation}
        onClick={() => setSelectedLayer(id)}
        isSelected={selectedLayer === id}
      >
        <StyledArrow
          isOpen={isOpen}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!isOpen);
          }}
        />
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
        <Name isHovered={isHovered} isSelected={selectedLayer === id}>
          {name}
        </Name>
      </Wrapper>
      {isOpen && <>{children || null}</>}
    </>
  );
};

WrapperLayer.propTypes = {
  layer: PropTypes.object.isRequired,
  generation: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
};

export default WrapperLayer;
