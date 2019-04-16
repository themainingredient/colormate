import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';
import GlobalStyles from '../../../Global.styles';
import Arrow from '../../../assets/arrowGrey.svg';

const { colors, fonts } = GlobalStyles;

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ generation }) => 16 * generation}px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: ${({ isSelected }) => (isSelected ? colors.TMIBlueLight : '')};
`;

export const StyledArrow = styled(props => <Arrow {...omit(props, ['isOpen'])} />)`
  margin-right: 8px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 150ms ease-in-out;
`;

export const Name = styled.p`
  font-family: ${fonts.SFPro.reg};
  font-size: 14px;
  color: ${({ isSelected }) => (isSelected ? colors.TMIBlue : colors.DarkGrey)};
  margin-left: 8px;
  border-bottom: ${({ isHovered }) => (isHovered ? `1px solid ${colors.TMIBlue}` : '1px solid #00000000')};
`;

export const ColorType = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.DarkGrey};
  background-color: ${colorType => (colorType.type === 'fill' ? colors.DarkGrey : '')};
  margin-right: 16px;
`;
