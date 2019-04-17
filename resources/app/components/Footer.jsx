import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Globals from '../Global.styles';
import useHover from '../hooks/useHover';
import { closeWindow } from '../helpers/window.ts';

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
    cursor: pointer;
  }
`;

const Bold = styled.span`
  font-family: ${fonts.SFPro.bold};
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
  const [isHovered, hoverRef] = useHover();

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
        <MadeBy onClick={() => openUrlInBrowser('https://www.themainingredient.co')}>
          Made by <Bold>The Main Ingredient</Bold>
        </MadeBy>
      </FeedbackMadeByWrapper>
      <Button ref={hoverRef} type='button' onClick={() => closeWindow()}>
        {isHovered ? '👍' : 'Done'}
      </Button>
    </FooterWrapper>
  );
};

export default Footer;
