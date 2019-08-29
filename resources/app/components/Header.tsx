import React from 'react';
import styled from 'styled-components';
import Globals, { flexCenter } from '../Global.styles';

import ColormateLogo from '../assets/colormateLogo.svg';

const { colors, fonts } = Globals;
const isBeta = process.env.REACT_APP_IS_BETA;
const VERSION = isBeta ? `${process.env.REACT_APP_VERSION}-beta` : process.env.REACT_APP_VERSION;

const HeaderWrapper = styled.div`
  ${flexCenter};
  height: 87px;
  width: 100%;
  background-color: ${colors.LightGrey};
  box-shadow: 0 5px 10px 2px ${colors.Black25};
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

const Header = () => (
  <HeaderWrapper>
    <StyledColormateLogo />
    <Tag>{VERSION}</Tag>
  </HeaderWrapper>
);

export default Header;
