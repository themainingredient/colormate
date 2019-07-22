import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';
import GlobalStyles from '../../../Global.styles';
import Arrow from '../../../assets/arrowGrey.svg';

const { colors, fonts } = GlobalStyles;

interface NodeWrapperProps {
  generation: number,
  isSelected: boolean
}

interface NameProps {
  isHovered: boolean,
  isSelected: boolean
}

interface ColorTypeProps {
  colorType: string
}

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ generation }: NodeWrapperProps) => 16 * generation}px;
  height: 33px;
  background-color: ${({ isSelected }: NodeWrapperProps) => (isSelected ? colors.TMIBlueLight : '')};
`;

export const StyledArrow = styled(props => <Arrow {...omit(props, ['isOpen'])} />)`
  margin-right: 8px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 150ms ease-in-out;
`;

export const Name = styled.p`
  font-family: ${fonts.SFPro.reg};
  font-size: 14px;
  color: ${({ isSelected }: NameProps) => (isSelected ? colors.TMIBlue : colors.DarkGrey)};
  margin-left: 8px;
  border-bottom: ${({ isHovered }: NameProps) => (isHovered ? `1px solid ${colors.TMIBlue}` : '1px solid #00000000')};
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;

export const ColorType = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 8px;
  border: 1px solid ${colors.DarkGrey};
  background-color: ${({ colorType }: ColorTypeProps) => (colorType === '' ? colors.DarkGrey : '')};
  margin-right: 16px;
`;
