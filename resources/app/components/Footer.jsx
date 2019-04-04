import React, { useState } from 'react';
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

const MadeBy = styled.a`
  color: ${colors.MediumGrey};
  font-family: ${fonts.SFPro.reg};
  font-size: 11px;
  text-decoration: none;

  &:hover {
    color: ${colors.TMIBlue};
  }
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

  &:hover {
    background-color: ${colors.TMIBlueDark};
  }
`;

const FeedbackMadeByWrapper = styled.div``;

const Feedback = styled.a`
  font-family: ${fonts.SFPro.bold};
  color: ${colors.DarkGrey};
  font-size: 12px;
  text-decoration: none;

  &:hover {
    color: ${colors.TMIBlue};
  }
`;

const openUrlInBrowser = (url) => {
  window.postMessage('openUrlInBrowser', url);
};

const Footer = () => {
  const [isHoveringButton, setHoveringButton] = useState(false);

  const handleCloseButton = () => {
    window.postMessage('closeWindow');
  };

  return (
    <FooterWrapper>
      <FeedbackMadeByWrapper>
        <Feedback href='mailto:colormate@themainingredient.co'>
          <span role='img' aria-label='letter-with-heart'>
            💌
          </span>{' '}
          Report & support here
        </Feedback>
        <br />
        <MadeBy onClick={() => openUrlInBrowser('http://www.themainingredient.co')}>
          Made by <Bold>The Main Ingredient</Bold>
        </MadeBy>
      </FeedbackMadeByWrapper>
      <Button
        onMouseEnter={() => setHoveringButton(true)}
        onMouseLeave={() => setHoveringButton(false)}
        type='button'
        onClick={() => handleCloseButton()}
      >
        {isHoveringButton ? (
          <span role='img' aria-label='ThumbsUp'>
            👍
          </span>
        ) : (
          'Done'
        )}
      </Button>
    </FooterWrapper>
  );
};

export default Footer;
