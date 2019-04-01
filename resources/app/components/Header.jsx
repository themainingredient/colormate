import React from 'react';
import styled from 'styled-components';
import Globals, { flexCenter } from '../Global.styles';

import ColormateLogo from '../assets/colormateLogo.svg';

const { colors, fonts } = Globals;

// TODO: Put recurring css in global file
const HeaderWrapper = styled.div`
  ${flexCenter};
  height: 87px;
  width: 320px;
  background-color: ${colors.LightGrey};
`;

const Tag = styled.div`
  height: 22px;
  width: 39px;
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

const Header = () => (
  <HeaderWrapper>
    <ColormateLogo height={66} width={186} />
    <Tag>v0.1</Tag>
  </HeaderWrapper>
);

export default Header;
