import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 18px;
  height: 78px;
  width: 320px;
  background-color: #e7ebec;
`;

const MadeBy = styled.p`
  color: #4d4f59;
  font-family: 'SFProDisplay-Regular';
  font-size: 11px;
`;

const Bold = styled.span`
  font-weight: 700;
`;

const Button = styled.button`
  height: 37px;
  width: 92px;
  font-family: 'SFProDisplay-Bold';
  font-size: 14px;
  color: #ffffff;
  border-radius: 23px;
  background-color: #4e41ff;
  border: none;
`;

const Footer = () => (
  <FooterWrapper>
    <MadeBy>
      Made by <Bold>The Main Ingredient</Bold>
    </MadeBy>
    <Button type='button'>Done</Button>
  </FooterWrapper>
);

export default Footer;
