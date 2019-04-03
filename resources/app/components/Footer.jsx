import React from 'react';
import styled from 'styled-components';
import Globals from '../Global.styles';

const { colors, fonts } = Globals;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 18px;
  height: 78px;
  width: 320px;
  background-color: ${colors.LightGrey};
`;

const MadeBy = styled.p`
  color: ${colors.MediumGrey};
  font-family: ${fonts.SFPro.reg};
  font-size: 11px;
`;

const Bold = styled.span`
  font-family: ${fonts.SFPro.bold};
`;

const Button = styled.button`
  height: 37px;
  width: 92px;
  font-family: ${fonts.SFPro.bold};
  font-size: 14px;
  color: ${colors.White};
  border-radius: 23px;
  background-color: ${colors.TMIBlue};
  border: none;
`;

const Footer = () => {
  const handleCloseButton = () => {
    window.postMessage('closeWindow');
  };

  return (
    <FooterWrapper>
      <MadeBy>
        Made by <Bold>The Main Ingredient</Bold>
      </MadeBy>
      <Button type='button' onClick={() => handleCloseButton()}>
        Done
      </Button>
    </FooterWrapper>
  );
};

export default Footer;
