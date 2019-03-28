import React from 'react';
import styled from 'styled-components';

import ColormateLogo from '../assets/colormateLogo.svg';

// TODO: Put recurring css in global file
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87px;
  width: 320px;
  background-color: #e7ebec;
`;

const Tag = styled.div`
  height: 22px;
  width: 39px;
  background-color: #4e41ff;
  border-radius: 11px;
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
  font-family: 'SFProDisplay-Regular';
  font-size: 11px;
  line-height: 24px;
  text-align: center;
`;

const Header = () => (
  <HeaderWrapper>
    <ColormateLogo height={66} width={186} />
    <Tag>v1.0</Tag>
  </HeaderWrapper>
);

export default Header;
