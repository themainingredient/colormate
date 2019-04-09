import React from 'react';
import styled from 'styled-components';
import Globals, { flexCenter } from '../Global.styles';

import ColormateLogo from '../assets/colormateLogo.svg';
import Bubble from '../assets/bubble.svg';

const { colors, fonts } = Globals;
const isBeta = process.env.REACT_APP_IS_BETA;
const VERSION = isBeta ? `${process.env.REACT_APP_VERSION}-beta` : process.env.REACT_APP_VERSION;

const HeaderWrapper = styled.div`
  ${flexCenter};
  height: 87px;
  width: 320px;
  background-color: ${colors.LightGrey};
  overflow: hidden;
`;

const Tag = styled.div`
  height: 22px;
  width: ${isBeta ? '60px' : '39px'};
  background-color: ${colors.TMIBlue};
  border-radius: 11px;
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${colors.White};
  font-family: ${fonts.SFPro.reg};
  font-size: 11px;
  line-height: 24px;
  text-align: center;
`;

const StyledColormateLogo = styled(ColormateLogo)`
  position: absolute;
  top: 50%;
  left: 47%;
  transform: translate(-50%, -50%);
`;

const BigBubble = styled(Bubble)`
  position: absolute;
  right: 2px;
  bottom: -20px;
  height: 43px;
  width: 43px;
`;

const SmallBubble = styled(Bubble)`
  position: absolute;
  right: 4px;
  bottom: 26px;
  height: 18px;
  width: 18px;
`;

const Header = () => (
  <HeaderWrapper>
    <StyledColormateLogo height={66} width={186} />
    <BigBubble />
    <SmallBubble />
    <Tag>{VERSION}</Tag>
  </HeaderWrapper>
);

export default Header;
